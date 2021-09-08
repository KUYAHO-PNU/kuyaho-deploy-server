import { TerminalResGet } from "./dto/TerminalResGet.dto";
import { TerminalService } from "./terminal.service";
export declare class TerminalController {
    readonly TerminalService: TerminalService;
    constructor(TerminalService: TerminalService);
    getResponse(cmd: string): Promise<TerminalResGet[] | string>;
    postResponse(postCmd: TerminalResGet): Promise<TerminalResGet>;
}
