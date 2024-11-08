import slugify from "slugify";

// import * as XLSX from 'xlsx/xlsx.mjs';
export class FunctionUtil {
    static formatNumber(value: number): string {
        return new Intl.NumberFormat('de-DE').format(value);
    }
    static convertSlugUrl(value: string | undefined): string {
        if (!value) return "";
        return slugify(value, { locale: "vi", lower: true })
    }
    static getIdFromPath(path: string): string {
        const pathArr = path?.split('.');
        const namePathArr = pathArr[0]?.split("-")
        return namePathArr[namePathArr?.length - 1]
    }
}