# Bloodhound
> Hunt down forgotten code annotations and technical debt across any project.

---

## Overview

Bloodhound is a TypeScript CLI tool that scans codebases for annotation comments such as `TODO`, `FIXME`, and `HACK`, groups them, and generates a clean report so nothing gets left behind.

---

## Supported Annotation Types

| Tag | Purpose |
|---|---|
| `TODO` | Something that needs to be done or implemented |
| `FIXME` | Something that is broken and needs to be fixed |
| `HACK` | A workaround or ugly solution that should be revisited |
| `BUG` | A known bug that hasn't been addressed yet |
| `NOTE` | An important note left for other developers |
| `XXX` | A warning about problematic or dangerous code |
| `OPTIMIZE` | Code that works but needs performance improvement |
| `REVIEW` | Code that needs to be reviewed before shipping |
| `DEPRECATED` | Code that is outdated and should no longer be used |
| `TEMP` | Temporary code that should be removed later |

> Custom Bloodhound-specific tags will be introduced in a future release.

---

## CLI Options

### Directory
| Flag | Description |
|---|---|
| *(none)* | Scans the current working directory by default |
| `-dir <path>` | Scans the specified directory path |

### File Types
| Flag | Description |
|---|---|
| *(none)* | Scans all common code file types by default |
| `-ext <extensions>` | Scans only the specified file extensions (e.g. `-ext ts,js,py`) |
| `-all` | Includes non-code files such as `.txt`, `.md`, `.json` etc. |

### Output Grouping
| Flag | Description |
|---|---|
| *(none)* | Groups results by annotation type (default) |
| `-byfile` | Groups results by file instead of annotation type |

### Report Saving
| Flag | Description |
|---|---|
| *(none)* | Prints results to terminal only, no file saved |
| `-save txt` | Saves the report as a `.txt` file |
| `-save json` | Saves the report as a `.json` file |
| `-out <path>` | Specifies the directory to save the report (defaults to current working directory if not provided) |

---

## Output Format

### Default — Grouped by Annotation Type

```
============================
TODO
============================

  TODO @ Line 42
  Refactor this function to use the new API
  src/utils/parser.ts

  TODO @ Line 118
  No comment
  src/controllers/userController.ts

============================
FIXME
============================

  FIXME @ Line 77
  This breaks when input is an empty array
  src/helpers/validator.ts
```

---

### Alternative — Grouped by File (`bloodhound sniff -byfile`)

```
============================
src/utils/parser.ts
============================

  TODO @ Line 42
  Refactor this function to use the new API

  HACK @ Line 89
  Temporary workaround until the upstream bug is fixed

============================
src/helpers/validator.ts
============================

  FIXME @ Line 77
  This breaks when input is an empty array
```

---

## Default Code File Types

When no `-ext` flag is provided, Bloodhound will scan the following extensions by default:

`.ts` `.tsx` `.js` `.jsx` `.py` `.java` `.c` `.cpp` `.cs` `.go` `.rb` `.rs` `.php` `.swift` `.kt`

When `-all` is provided, Bloodhound additionally scans:

`.txt` `.md` `.json` `.yaml` `.yml` `.toml` `.env` `.html` `.css` `.scss`

---

## Example Commands

```bash
# Scan current directory with default settings
bloodhound sniff

# Scan a specific directory
bloodhound sniff -dir ./my-project

# Scan only TypeScript and JavaScript files
bloodhound sniff -ext ts,js

# Group results by file
bloodhound sniff -byfile

# Save report as JSON to a specific folder
bloodhound sniff -save json -out ./reports

# Full example
bloodhound sniff -dir ./my-project -ext ts,js -byfile -save txt -out ./reports
```