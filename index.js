import fs from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { program, Option } from 'commander'
import YAML from 'yaml'
import { addSchema } from '@hyperjump/json-schema/draft-2020-12'
import { bundle } from '@hyperjump/json-schema/bundle'

const dir = dirname(fileURLToPath(import.meta.url))
const schemaFolders = ['./schemas/formats', './schemas/columns']

program.name('focus').description('FinOps FOCUS schema CLI')

program
  .command('bundle')
  .argument('[schema]', 'specification schema URL')
  .addOption(
    new Option('-d, --destination <path>', 'destination path').default(
      './schemas/bundled'
    )
  )
  .description('Bundle schema')
  .action(async function (id) {
    for (const folder of schemaFolders) {
      loadSchemas(folder)
    }

    const bundledFiles = {}
    if (id) {
      bundledFiles[id.split('/').pop().replace('.schema.json', '')] =
        await bundle(id)
    } else {
      for (const f of fs.readdirSync(join(dir, './schemas'))) {
        if (f.endsWith('.schema.json')) {
          const s = await bundle(`file://${dir}/schemas/${f}`)
          bundledFiles[f.replace('.schema.json', '')] = s
        }
      }
    }

    // write bundled files
    const destinationDir = join(dir, this.opts().destination)
    for (const [name, s] of Object.entries(bundledFiles)) {
      const contentWithComment = {
        $comment: "This file is automatically generated. Don't edit it.",
        ...s,
      }
      fs.writeFileSync(
        join(destinationDir, `${name}.schema.json`),
        JSON.stringify(contentWithComment, null, 2)
      )

      fs.writeFileSync(
        join(destinationDir, `${name}.schema.yaml`),
        YAML.stringify(contentWithComment)
      )
    }
  })

await program.parseAsync(process.argv)

function loadSchemas(path) {
  for (const f of fs.readdirSync(path)) {
    if (f.endsWith('.schema.json')) {
      const s = JSON.parse(fs.readFileSync(join(dir, path, f), 'utf8'))
      addSchema(s)
    }
  }
}
