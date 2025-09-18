import { Controller, UseFormReturn, UseFormRegister } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { RestForm } from '@/types/rest.type';

interface RestBarProps {
  control: UseFormReturn<RestForm>['control'];
  register: UseFormRegister<RestForm>;
}

function RestBar({ control, register }: RestBarProps) {
  return (
    <div className="flex gap-2">
      <Controller
        name="method"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Input
        type="text"
        placeholder="https://api.example.com"
        {...register('url')}
        className="flex-1"
        required
      />

      <Button type="submit">Send</Button>
    </div>
  );
}

export default RestBar;
