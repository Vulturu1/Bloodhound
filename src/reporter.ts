import * as fs from "fs";
import * as path from "path";
import { Annotation, AnnotationType, ScanOptions, AnnotationGroupByFile, AnnotationGroupByType, ReportFileType } from "./types";

// ANSI color codes
const colors = {
    reset:   "\x1b[0m",
    bold:    "\x1b[1m",
    red:     "\x1b[31m",
    yellow:  "\x1b[33m",
    cyan:    "\x1b[36m",
    green:   "\x1b[32m",
    magenta: "\x1b[35m"
}

// Maps each annotation type to a color based on severity
function getColor(annotationType: AnnotationType): string {
    switch (annotationType) {
        case AnnotationType.Bug:
        case AnnotationType.Fixme:
            return colors.red;
        case AnnotationType.Hack:
        case AnnotationType.Xxx:
        case AnnotationType.Temp:
            return colors.yellow;
        case AnnotationType.Todo:
        case AnnotationType.Optimize:
        case AnnotationType.Review:
            return colors.cyan;
        case AnnotationType.Note:
            return colors.green;
        case AnnotationType.Deprecated:
            return colors.magenta;
        default:
            return colors.reset;
    }
}

function formatByType(annotations: Annotation[]): AnnotationGroupByType[] {
    const grouped: AnnotationGroupByType[] = []
    for (const annoType of Object.values(AnnotationType)) {
        const outputAnnos = annotations.filter(annotation => annotation.annotationType === annoType);
        if (outputAnnos.length === 0) { continue; }
        const annoGroup: AnnotationGroupByType = {
            annotationType: annoType,
            groupedAnnotations: outputAnnos
        }
        grouped.push(annoGroup);
    }
    return grouped;
}

function formatByFile(annotations: Annotation[]): AnnotationGroupByFile[] {
    const grouped: AnnotationGroupByFile[] = [];
    const uniquePaths = [...new Set(annotations.map(a => a.filePath))];
    for (const filePath of uniquePaths) {
        const outputAnnos = annotations.filter(annotation => annotation.filePath === filePath);
        const annoGroup: AnnotationGroupByFile = {
            annotationPath: filePath,
            groupedAnnotations: outputAnnos
        }
        grouped.push(annoGroup);
    }
    return grouped;
}

export function generateReport(annotations: Annotation[], scanOptions: ScanOptions) {
    let output: string = "";        // Plain text — used for file saving
    let colorOutput: string = "";   // Colored — used for terminal only

    if (!scanOptions.groupByFile) {
        const report: AnnotationGroupByType[] = formatByType(annotations);
        for (const item of report) {
            const color = getColor(item.annotationType);
            const heading = `\n=== ${item.groupedAnnotations.length} ${item.annotationType}'s Found ================\n`;

            output += heading;
            colorOutput += `${color}${colors.bold}${heading}${colors.reset}`;

            for (const annotation of item.groupedAnnotations) {
                const annoLine = `Annotation Type | ${color}${annotation.annotationType}${colors.reset} on line ${annotation.annotationLine}\n`;
                const commentLine = `Comment         | ${annotation.comment}\n`;
                const pathLine = `Path to file    | ${annotation.filePath}\n`;

                output += "\n";
                output += `Annotation Type | ${annotation.annotationType} on line ${annotation.annotationLine}\n`;
                output += commentLine;
                output += pathLine;

                colorOutput += "\n";
                colorOutput += annoLine;
                colorOutput += commentLine;
                colorOutput += pathLine;
            }
        }
    } else {
        const report: AnnotationGroupByFile[] = formatByFile(annotations);
        for (const file of report) {
            const heading = `\n=== Annotations in ${file.annotationPath} ================\n`;

            output += heading;
            colorOutput += `${colors.bold}${colors.cyan}${heading}${colors.reset}`;

            for (const item of file.groupedAnnotations) {
                const color = getColor(item.annotationType);
                const annoLine = `Annotation Type | ${color}${item.annotationType}${colors.reset} on line ${item.annotationLine}\n`;
                const commentLine = `Comment         | ${item.comment}\n`;

                output += "\n";
                output += `Annotation Type | ${item.annotationType} on line ${item.annotationLine}\n`;
                output += commentLine;

                colorOutput += "\n";
                colorOutput += annoLine;
                colorOutput += commentLine;
            }
        }
    }

    // Print colored output to terminal
    console.log(colorOutput);

    // Save plain text output to file if requested
    if (scanOptions.reportFileType) {
        const fileName = `bloodhound-report.${scanOptions.reportFileType}`;
        const outputPath = path.join(scanOptions.outputDirectory ?? process.cwd(), fileName);

        if (scanOptions.reportFileType === ReportFileType.json) {
            fs.writeFileSync(outputPath, JSON.stringify(annotations, null, 2));
        } else {
            fs.writeFileSync(outputPath, output);
        }
    }
}