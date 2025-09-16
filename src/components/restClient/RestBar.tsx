import { UseFormRegister } from 'react-hook-form';
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
  register: UseFormRegister<RestForm>;
}

function RestBar({ register }: RestBarProps) {
  return (
    <div className="flex gap-2">
      <Select
        defaultValue="GET"
        onValueChange={(val) =>
          register('method').onChange({ target: { value: val } })
        }
      >
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

      <Input
        type="text"
        placeholder="https://api.example.com"
        {...register('url')}
        className="flex-1"
      />

      <Button type="submit">Send</Button>
    </div>
  );
}

export default RestBar;
