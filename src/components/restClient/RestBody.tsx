'use client';

import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import CodeMirror from '@uiw/react-codemirror';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter, lintGutter } from '@codemirror/lint';
import { Button } from '../ui/button';

interface RestBodyProps {
  value: string;
  onChange: (val: string) => void;
}

function RestBody({ value, onChange }: RestBodyProps) {
  const [mode, setMode] = useState<'json' | 'text'>('json');
  const extensions =
    mode === 'json' ? [json(), lintGutter(), linter(jsonParseLinter())] : [];

  return (
    <div className="space-y-3 pt-4">
      <div className="flex flex-wrap justify-between items-center">
        <RadioGroup
          defaultValue="json"
          value={mode}
          onValueChange={(val: 'json' | 'text') => setMode(val)}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="json" id="json" />
            <Label htmlFor="json">JSON</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="text" id="text" />
            <Label htmlFor="text">Text</Label>
          </div>
        </RadioGroup>
        <Button
          type="button"
          variant="default"
          size="sm"
          disabled={mode !== 'json'}
          onClick={() => {
            if (mode === 'json') {
              try {
                const pretty = JSON.stringify(JSON.parse(value), null, 2);
                onChange(pretty);
              } catch {}
            }
          }}
        >
          Prettify
        </Button>
      </div>

      <CodeMirror
        value={value}
        height="200px"
        theme="light"
        extensions={extensions}
        onChange={onChange}
        className="rounded-md border"
      />
    </div>
  );
}

export default RestBody;
