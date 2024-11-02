// import * as XLSX from 'xlsx/xlsx.mjs';
export class FunctionUtil {
    static formatNumber(value: number): string {
        return new Intl.NumberFormat('de-DE').format(value);
    }
    // static exportExcel(data: any[], fileName: string): void {
    //     const worksheet = XLSX.utils.json_to_sheet(data);
    // }
}