# selected-collaborators

![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/akinocccc/selected-collaborators?style=flat-square)
![GitHub](https://img.shields.io/github/license/akinocccc/selected-collaborators?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/akinocccc/selected-collaborators?style=flat-square)

A GitHub Action that selects a number of repository collaborators at random from your repository's collaborators list.

## Inputs

| Input | Description | Default |
| ----- | ----------- | ------- |
| `token` | **Required**. The GitHub token to use to retrieve repository information. | N/A |
| `limit_number` | The number of collaborators to select at random. | 1 |
| `separator` | The separator will be used to separate candidates. | "," |

## Outputs

| Output | Description |
| ------ | ----------- |
| `candidates` | An array of the selected collaborator usernames. |
| `candidates_string` | A separated(default: comma) string of the selected collaborator usernames. |
| `at_candidates_string` | A comma-separated string of the selected collaborator usernames with an `@` symbol prefix. |

## Example usage

```yaml
- name: Select random repository collaborators
  uses: akinocccc/selected-collaborators@v1.0.0
  id: select-collaborators
  with:
    limit_number: 3
    token: ${{ secrets.GITHUB_TOKEN }}

- name: Use selected collaborators
  run: |
    echo "Selected collaborators: ${{ steps.select-collaborators.outputs.candidates_string }}"
    echo "Selected collaborators with '@' prefix: ${{ steps.select-collaborators.outputs.at_candidates_string }}"
