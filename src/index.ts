import { Annotation, ScanOptions, NonCodeFileExtension, CodeFileExtension, AnnotationType, ReportFileType } from "./types";

const args = process.argv.slice(2);

if (args[0] !== "sniff") {
    console.log("Usage: bloodhound sniff [options]");
    process.exit(1);
}

const dirIndex: number = args.indexOf("-dir");
const directory: string | undefined = dirIndex !== -1 ? args[dirIndex + 1] : undefined;

const extIndex: number = args.indexOf("-ext");
const extensions: string[] | undefined = extIndex !== -1 ? args[extIndex + 1]?.split(",") : undefined;

const extAll: boolean = args.includes("-all");

const byFileArg: boolean = args.includes("-byfile");

const reportExtIndex: number = args.indexOf("-save");
const reportExtenstion: string | undefined = reportExtIndex !== -1 ? args[reportExtIndex + 1] : undefined;

const outIndex: number = args.indexOf("-out");
const outputDirectory: string | undefined = outIndex !== -1 ? args[outIndex + 1] : undefined;

const validSaveTypes = Object.values(ReportFileType);


const scanOptions: ScanOptions = {
    scanDirectory: directory ?? process.cwd(),
    extensions: extAll ? [Object.values(CodeFileExtension), Object.values(NonCodeFileExtension)].flat() 
        : extensions 
            ? extensions.map(ext => ext as CodeFileExtension | NonCodeFileExtension)
            : Object.values(CodeFileExtension),
    groupByFile: byFileArg,
    reportFileType: validSaveTypes.includes(reportExtenstion as ReportFileType) 
        ? reportExtenstion as ReportFileType 
        : undefined,
    outputDirectory: outputDirectory
}