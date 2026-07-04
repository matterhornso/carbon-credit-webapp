// component.tsx
exports.component = (name) => `import React from 'react';
import {${name}Props} from './${name}.interface';
const ${name} = (props: ${name}Props) => {
  return <div>${name} component.</div>;
};
export default ${name};
`

// component.interface.tsx
exports.interface = (name) => `export interface ${name}Props{

}
`

// component.test.tsx
exports.test = (name) => `import React from "react";
import { render, screen } from "@testing-library/react";
import ${name} from './${name}';

test("renders ${name}", () => {
  // render(<App />);
  // const linkElement = screen.getByText(/${name}/i);
  // expect(linkElement).toBeInTheDocument();
});
`

// index.ts
exports.barrel = (name) => `import ${name} from './${name}';
export default ${name};
`
