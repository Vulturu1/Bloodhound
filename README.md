# 🐕 Bloodhound
> Hunt down forgotten code annotations and technical debt across any project.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)

---

## Overview

Bloodhound is a standalone CLI tool that scans codebases for annotation comments such as `TODO`, `FIXME`, and `HACK`, groups them into a clean report, and optionally saves the output to a file. No Node.js or runtime required — just download and run.

---

## Installation

### Windows

1. Go to the [Releases](https://github.com/Vulturu1/Bloodhound/releases) page
2. Download `bloodhound-win.exe` and `install.bat` into the same folder
3. Right-click `install.bat` and select **Run as administrator**
4. Open a **new** terminal and run:
```
bloodhound sniff
```

### macOS / Linux

1. Go to the [Releases](https://github.com/Vulturu1/Bloodhound/releases) page
2. Download the binary for your platform (`bloodhound-macos` or `bloodhound-linux`) and `install.sh` into the same folder
3. Open a terminal in that folder and run:
```bash
chmod +x install.sh && sudo ./install.sh
```
4. Run:
```bash
bloodhound sniff
```

---

## Uninstallation

### Windows

1. Download `uninstall.bat` from the [Releases](https://github.com/Vulturu1/Bloodhound/releases) page
2. Right-click `uninstall.bat` and select **Run as administrator**

### macOS / Linux

1. Download `uninstall.sh` from the [Releases](https://github.com/Vulturu1/Bloodhound/releases) page
2. Open a terminal in that folder and run:
```bash
chmod +x uninstall.sh && sudo ./uninstall.sh
```

---

## Usage

```bash
bloodhound sniff [options]
```

### Options

| Flag | Description |
|---|---|
| *(none)* | Scans the current working directory |
| `-dir <path>` | Scans the specified directory |
| `-ext <extensions>` | Scans only specified file extensions (e.g. `-ext ts,js,py`) |
| `-all` | Includes non-code files such as `.txt`, `.md`, `.json` |
| `-byfile` | Groups results by file instead of annotation type |
| `-save txt` | Saves the report as a `.txt` file |
| `-save json` | Saves the report as a `.json` file |
| `-out <path>` | Directory to save the report (defaults to current directory) |

---

## Example Commands

```bash
# Scan current directory
bloodhound sniff

# Scan a specific directory
bloodhound sniff -dir ./my-project

# Scan only TypeScript and JavaScript files
bloodhound sniff -ext ts,js

# Group results by file
bloodhound sniff -byfile

# Save report as JSON
bloodhound sniff -save json -out ./reports

# Full example
bloodhound sniff -dir ./my-project -ext ts,js -byfile -save txt -out ./reports
```

---

## Supported Annotation Types

| Tag | Purpose |
|---|---|
| `TODO` | Something that needs to be done |
| `FIXME` | Something broken that needs fixing |
| `HACK` | A workaround that should be revisited |
| `BUG` | A known bug that hasn't been addressed |
| `NOTE` | An important note for other developers |
| `XXX` | A warning about problematic code |
| `OPTIMIZE` | Code that needs performance improvement |
| `REVIEW` | Code that needs review before shipping |
| `DEPRECATED` | Outdated code that should no longer be used |
| `TEMP` | Temporary code that should be removed |

---

## Supported File Types

### Default (code files)
`.ts` `.tsx` `.js` `.jsx` `.py` `.java` `.c` `.cpp` `.cs` `.go` `.rb` `.rs` `.php` `.swift` `.kt`

### With `-all` flag (additionally scans)
`.txt` `.md` `.json` `.yaml` `.yml` `.toml` `.env` `.html` `.css` `.scss`

---

## Example Output

### Grouped by Type (default)
```
=== 3 TODO's Found ================

Annotation Type | TODO on line 4
Comment         | Add input validation for email format
Path to file    | src/userService.ts

Annotation Type | TODO on line 22
Comment         | Implement proper session management
Path to file    | src/userService.ts

=== 2 FIXME's Found ================

Annotation Type | FIXME on line 7
Comment         | This breaks when email contains special characters
Path to file    | src/userService.ts
```

### Grouped by File (`-byfile`)
```
=== Annotations in src/userService.ts ================

Annotation Type | TODO on line 4
Comment         | Add input validation for email format

Annotation Type | FIXME on line 7
Comment         | This breaks when email contains special characters
```

---

## Building from Source

If you'd prefer to build Bloodhound yourself:

```bash
# Clone the repository
git clone https://github.com/Vulturu1/Bloodhound.git
cd Bloodhound

# Install dependencies
npm install

# Build
npm run build

# Package binaries
npm run package
```

Binaries will be output to the `binaries/` folder.

---

## License

MIT © Vulturu1