import React, { useState, useMemo } from 'react';
import { Plus, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';
import { EmployeeCard } from '@/components/employee/EmployeeCard';
import { EmployeeForm } from '@/components/employee/EmployeeForm';
import { FilterSidebar } from '@/components/employee/FilterSidebar';
import { SortSelect } from '@/components/employee/SortSelect';
import { Pagination } from '@/components/employee/Pagination';
import { DeleteConfirmDialog } from '@/components/employee/DeleteConfirmDialog';
import { useEmployees } from '@/hooks/useEmployees';
import { Employee, EmployeeFormData, FilterOptions, SortOptions } from '@/types/employee';
import { toast } from '@/hooks/use-toast';

export const EmployeeDashboard: React.FC = () => {
  const {
    employees,
    loading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees
  } = useEmployees();

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    firstName: '',
    department: 'all-departments',
    role: 'all-roles'
  });
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'firstName',
    direction: 'asc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and search employees
  const filteredEmployees = useMemo(() => {
    return searchEmployees(searchTerm, filters, sortOptions);
  }, [searchEmployees, searchTerm, filters, sortOptions]);

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + pageSize);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, sortOptions]);

  const handleAddEmployee = (employeeData: EmployeeFormData) => {
    addEmployee(employeeData);
    setShowForm(false);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleUpdateEmployee = (employeeData: EmployeeFormData) => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, employeeData);
      setEditingEmployee(null);
      setShowForm(false);
    }
  };

  const handleDeleteEmployee = (employee: Employee) => {
    setEmployeeToDelete(employee);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      deleteEmployee(employeeToDelete.id);
      setEmployeeToDelete(null);
      toast({
        title: "Employee Deleted",
        description: `${employeeToDelete.firstName} ${employeeToDelete.lastName} has been removed from the directory.`,
        variant: "destructive"
      });
    }
  };

  const handleClearFilters = () => {
    setFilters({
      firstName: '',
      department: 'all-departments',
      role: 'all-roles'
    });
    setSearchTerm('');
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading employee directory...</p>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-muted/50 py-8">
        <div className="container mx-auto px-4">
          <EmployeeForm
            employee={editingEmployee}
            onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
            onCancel={handleFormCancel}
            isEditing={!!editingEmployee}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-primary-glow text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold">Employee Directory</h1>
              <p className="text-primary-foreground/90 mt-2">
                Manage your organization's employee information
              </p>
            </div>
            <Button onClick={() => setShowForm(true)} size="lg" variant="secondary">
              <Plus className="h-5 w-5 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar for desktop filters */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <FilterSidebar
              isOpen={true}
              onClose={() => {}}
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Search and controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <SearchInput
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search by name or email..."
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <SortSelect
                  sortOptions={sortOptions}
                  onSortChange={setSortOptions}
                />
                
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results summary */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredEmployees.length} of {employees.length} employees
              </p>
            </div>

            {/* Employee grid/list */}
            {paginatedEmployees.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No employees found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <>
                <div className={`
                  ${viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                    : 'space-y-4'
                  }
                  mb-8
                `}>
                  {paginatedEmployees.map((employee) => (
                    <EmployeeCard
                      key={employee.id}
                      employee={employee}
                      onEdit={handleEditEmployee}
                      onDelete={handleDeleteEmployee}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  totalItems={filteredEmployees.length}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={setPageSize}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Delete confirmation dialog */}
      <DeleteConfirmDialog
        isOpen={!!employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
        onConfirm={confirmDelete}
        employee={employeeToDelete}
      />
    </div>
  );
};