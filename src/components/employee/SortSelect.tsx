import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SortOptions } from '@/types/employee';

interface SortSelectProps {
  sortOptions: SortOptions;
  onSortChange: (sortOptions: SortOptions) => void;
}

export const SortSelect: React.FC<SortSelectProps> = ({
  sortOptions,
  onSortChange
}) => {
  const toggleDirection = () => {
    onSortChange({
      ...sortOptions,
      direction: sortOptions.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const handleFieldChange = (field: string) => {
    onSortChange({
      field: field as SortOptions['field'],
      direction: sortOptions.direction
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Select value={sortOptions.field} onValueChange={handleFieldChange}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="firstName">First Name</SelectItem>
          <SelectItem value="lastName">Last Name</SelectItem>
          <SelectItem value="department">Department</SelectItem>
          <SelectItem value="role">Role</SelectItem>
        </SelectContent>
      </Select>
      
      <Button
        variant="outline"
        size="sm"
        onClick={toggleDirection}
        className="px-3"
      >
        {sortOptions.direction === 'asc' ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};