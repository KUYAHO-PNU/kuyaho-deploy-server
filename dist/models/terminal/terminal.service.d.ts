import { Repository } from "typeorm";
import { TerminalResGet } from "./dto/TerminalResGet.dto";
import { TerminalResEntity } from "./entities/TermianlCmdEntity.entity";
export declare class TerminalService {
    private readonly TerminalRepository;
    constructor(TerminalRepository: Repository<TerminalResEntity>);
    getResponse(cmd: string): Promise<TerminalResGet[] | string>;
    postResponse(terminalRes: TerminalResGet): Promise<TerminalResGet>;
}
