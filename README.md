# FinOps FOCUS JSON Schemas

This repository contains JSON schemas and tools for the [FinOps Foundation's Open Cost and Usage Specification (FOCUS)](https://focus.finops.org/).

## Getting Started

To use the schema, clone this repository or download the schema directly and reference the JSON schema file in your data validation tools or scripts. Bundled schemas can be found in the `schemas/bundled` folder:

- [`v1.0-Preview Candidate Release`](./schemas/bundled/1.0-rc.1.schema.json)

## Roadmap

- [ ] Conditional rules, for example:

  ```json
  "$defs": {
    "rules": {
      "allOf": [
        {
          "$description": "When ChargeCategory is 'Purchase', ChargeFrequency MUST NOT be 'Usage-Based'.",
          "if": {
            "properties": {
              "ChargeCategory": { "const": "Purchase" }
            }
          },
          "then": {
            "properties": {
              "ChargeFrequency": { "not": { "const": "Usage-Based" } }
            }
          }
        }
      ]
    }
  }
  ```

- [ ] Validation CLI command
- [ ] Sample data generation command

## Contributing

Contributions to the schema are welcome, particularly in the following areas:

- Enhancements to reflect updates in the FinOps FOCUS specification.
- Additional examples and use cases.

## Development

**For an optimal developer experience, it is recommended to install [Nix](https://nixos.org/download.html) and [direnv](https://direnv.net/docs/installation.html).**

<details><summary><i>Installing Nix and direnv</i></summary><br>

**Note: These are instructions that _SHOULD_ work in most cases. Consult the links above for the official instructions for your OS.**

Install Nix:

```sh
sh <(curl -L https://nixos.org/nix/install) --daemon
```

Consult the [installation instructions](https://direnv.net/docs/installation.html) to install direnv using your package manager.

On MacOS:

```sh
brew install direnv
```

Install from binary builds:

```sh
curl -sfL https://direnv.net/install.sh | bash
```

The last step is to configure your shell to use direnv. For example for bash, add the following lines at the end of your `~/.bashrc`:

    eval "\$(direnv hook bash)"

**Then restart the shell.**

For other shells, see [https://direnv.net/docs/hook.html](https://direnv.net/docs/hook.html).

**MacOS specific instructions**

Nix may stop working after a MacOS upgrade. If it does, follow [these instructions](https://github.com/NixOS/nix/issues/3616#issuecomment-662858874).

<hr>
</details>

## License

This project is licensed under the MIT License - see the LICENSE file for details.
