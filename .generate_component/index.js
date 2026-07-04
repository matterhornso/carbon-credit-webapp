const fs = require('fs')
const {
    component,
    interface,
    test,
    barrel,
} = require('./component_templates.js')

// grab component name from terminal argument
const [type] = process.argv.slice(3)
const [name] = process.argv.slice(2)
if (!name) throw new Error('You must include a component name.')

let dir
if (type === 'page') {
    dir = `./src/pages/${name}/`
} else if (type === 'component') {
    dir = `./src/components/${name}/`
} else if (type === 'atom') {
    dir = `./src/atoms/${name}/`
} else {
    throw new Error('Please define a type. Type = page | component | atom')
}

// throw an error if the file already exists
if (fs.existsSync(dir))
    throw new Error('A component with that name already exists.')

// create the folder
fs.mkdirSync(dir)

function writeFileErrorHandler(err) {
    if (err) throw err
}

// component.tsx
fs.writeFile(`${dir}/${name}.tsx`, component(name), writeFileErrorHandler)
// component.scss
// fs.writeFile(`${dir}/${name}.scss`, '', writeFileErrorHandler)
// storybook.jsx
fs.writeFile(
    `${dir}/${name}.interface.ts`,
    interface(name),
    writeFileErrorHandler
)
// test.tsx
fs.writeFile(`${dir}/${name}.test.tsx`, test(name), writeFileErrorHandler)
// index.tsx
fs.writeFile(`${dir}/index.ts`, barrel(name), writeFileErrorHandler)

////////////////
/// Optional ///
////////////////

// // insert new component into 'components/index.ts file
// fs.readFile('./src/components/index.ts', 'utf8', function (err, data) {
//     if (err) throw err

//     // grab all components and combine them with new component
//     const currentComponents = data.match(/(?<=import )(.*?)(?= from)/g)
//     const newComponents = [name, ...currentComponents].sort()

//     // create the import and export statements
//     const importStatements = newComponents
//         .map((importName) => `import ${importName} from './${importName}';\n`)
//         .join('')
//     const exportStatements = `export {\n${newComponents
//         .map((component) => `  ${component},\n`)
//         .join('')}};\n`

//     const fileContent = `${importStatements}\n${exportStatements}`

//     fs.writeFile(
//         `./src/components/index.ts`,
//         fileContent,
//         writeFileErrorHandler
//     )
// })
