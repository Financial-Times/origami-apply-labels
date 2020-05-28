
# Origami Apply Labels

GitHub action to apply Origami labels to new issues and pull requests.

_See [origami-labels](https://github.com/Financial-Times/origami-labels) to sync standard labels between projects._

## Usage

To use this action, create the following file in your GitHub repo:

```
.github/workflows/sync-repo-labels.yml
```

```yml
on: [issues, pull_request]
jobs:
  sync-labels:
    runs-on: ubuntu-latest
    name: Sync repository labels
    steps:
      - uses: Financial-Times/origami-apply-labels@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

You can do this by running the following command from a repo:

```bash
mkdir -p .github/workflows && curl https://raw.githubusercontent.com/Financial-Times/origami-apply-labels/v1/example.yml --output .github/workflows/sync-repo-labels.yml
```

## Labels Applied

This action currently adds a github label for the [Origami Type](https://origami.ft.com/spec/v1/manifest/#origamitype) where an `origami.json`

## Development

Work should be based on the `master` branch, with changes PRed in.

If your changes are not breaking, merge them into the `v1` branch, and they'll be picked up by every repo running `v1` automatically.

If your changes ARE breaking, then you should create a `v2` branch based on master and update your chosen repo to use the new workflow.
