import { useState, useEffect, useCallback } from 'react';
import { Employee, EmployeeFormData, FilterOptions, SortOptions } from '@/types/employee';
import { mockEmployees } from '@/data/mockEmployees';

const STORAGE_KEY = 'employee-directory-data';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  // Load employees from localStorage or use mock data
  useEffect(() => {
    const savedEmployees = localStorage.getItem(STORAGE_KEY);
    if (savedEmployees) {
      try {
        setEmployees(JSON.parse(savedEmployees));
      } catch (error) {
        console.error('Error parsing saved employees:', error);
        setEmployees(mockEmployees);
      }
    } else {
      setEmployees(mockEmployees);
    }
    setLoading(false);
  }, []);

  // Save employees to localStorage whenever the employees array changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    }
  }, [employees, loading]);

  const addEmployee = useCallback((employeeData: EmployeeFormData) => {
    const newEmployee: Employee = {
      id: Date.now().toString(),
      ...employeeData
    };
    setEmployees(prev => [...prev, newEmployee]);
    return newEmployee;
  }, []);

  const updateEmployee = useCallback((id: string, employeeData: EmployeeFormData) => {
    setEmployees(prev => 
      prev.map(emp => 
        emp.id === id ? { ...emp, ...employeeData } : emp
      )
    );
  }, []);

  const deleteEmployee = useCallback((id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  }, []);

  const getEmployee = useCallback((id: string) => {
    return employees.find(emp => emp.id === id);
  }, [employees]);

  const searchEmployees = useCallback((
    searchTerm: string,
    filters: FilterOptions,
    sortOptions: SortOptions
  ) => {
    let filteredEmployees = [...employees];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredEmployees = filteredEmployees.filter(emp => 
        emp.firstName.toLowerCase().includes(term) ||
        emp.lastName.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term)
      );
    }

    // Apply filters
    if (filters.firstName) {
      filteredEmployees = filteredEmployees.filter(emp =>
        emp.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
      );
    }
    if (filters.department && filters.department !== 'all-departments') {
      filteredEmployees = filteredEmployees.filter(emp =>
        emp.department === filters.department
      );
    }
    if (filters.role && filters.role !== 'all-roles') {
      filteredEmployees = filteredEmployees.filter(emp =>
        emp.role === filters.role
      );
    }

    // Apply sorting
    filteredEmployees.sort((a, b) => {
      const aValue = a[sortOptions.field].toLowerCase();
      const bValue = b[sortOptions.field].toLowerCase();
      
      if (sortOptions.direction === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filteredEmployees;
  }, [employees]);

  return {
    employees,
    loading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    searchEmployees
  };
};