import * as fs from "fs";
import * as path from "path";
import { Annotation, AnnotationType, ScanOptions, AnnotationGroupByFile, AnnotationGroupByType, ReportFileType } from "./types";

export function formatByType(annotations: Annotation[]): AnnotationGroupByType[] {
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

export function formatByFile(annotations: Annotation[]): AnnotationGroupByFile[] {
    const grouped: AnnotationGroupByFile[] = [];  // Type unknown
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
    let output: string = "";
    if (!scanOptions.groupByFile) {
        const report: AnnotationGroupByType[] = formatByType(annotations);
        for (const item of report) {
            output += `\n=== ${item.groupedAnnotations.length} ${item.annotationType}'s Found ================\n`;
            for (const annotation of item.groupedAnnotations) {
                output += "\n";
                output += `Annotation Type | ${annotation.annotationType} on line ${annotation.annotationLine}\n`;
                output += `Comment         | ${annotation.comment}\n`;
                output += `Path to file    | ${annotation.filePath}\n`;
            }
        }
    } else {
        const report: AnnotationGroupByFile[] = formatByFile(annotations);
        for (const file of report) {
            output += `\n=== Annotations in ${file.annotationPath} ================\n`;
            for (const item of file.groupedAnnotations) {
                output += "\n";
                output += `Annotation Type | ${item.annotationType} on line ${item.annotationLine}\n`;
                output += `Comment         | ${item.comment}\n`;
            }
        }
    }
    console.log(output);
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
