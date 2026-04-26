export enum AnnotationType {
    Todo = "TODO",
    Fixme = "FIXME",
    Hack = "HACK",
    Bug = "BUG",
    Note = "NOTE",
    Xxx = "XXX",
    Optimize = "OPTIMIZE",
    Review = "REVIEW",
    Deprecated = "DEPRECATED",
    Temp = "TEMP"
}

export enum ReportFileType {
    txt = "txt",
    json = "json"
}

export enum CodeFileExtension {
    ts = "ts",
    tsx = "tsx",
    js = "js",
    jsx = "jsx",
    py = "py",
    java = "java",
    c = "c",
    cpp = "cpp",
    cs = "cs",
    go = "go",
    rb = "rb",
    rs = "rs",
    php = "php",
    swift = "swift",
    kt = "kt" 
}

export enum NonCodeFileExtension {
    txt = "txt",
    json = "json",
    md = "md",
    yaml = "yaml",
    yml = "yml",
    toml = "toml",
    env = "env",
    html = "html",
    css = "css",
    scss = "scss"
}

export interface Annotation {
    annotationType: AnnotationType;
    annotationLine: number;
    comment: string;
    filePath: string;
}

export interface AnnotationGroupByType {
    annotationType: AnnotationType;
    groupedAnnotations: Annotation[];
}

export interface AnnotationGroupByFile {
    annotationPath: string;
    groupedAnnotations: Annotation[];
}

export interface ScanOptions {
    scanDirectory: string;
    extensions: (CodeFileExtension | NonCodeFileExtension)[];
    groupByFile?: boolean;
    reportFileType?: ReportFileType | undefined;
    outputDirectory?: string | undefined;
}