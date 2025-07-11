import React from 'react';
import { Edit, Trash2, Mail, User, Building, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Employee } from '@/types/employee';

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onEdit,
  onDelete
}) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-card-foreground truncate">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">ID: {employee.id}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground truncate">{employee.email}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Building className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <Badge variant="secondary" className="text-xs">
            {employee.department}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Briefcase className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground text-xs">{employee.role}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onEdit(employee)}
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="flex-1"
          onClick={() => onDelete(employee)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};