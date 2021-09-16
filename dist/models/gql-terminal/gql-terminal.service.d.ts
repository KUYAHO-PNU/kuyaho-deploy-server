import { Repository } from "typeorm";
import { Command } from "./entities/command.entity";
export declare class GqlTerminalService {
    private readonly CliRepository;
    constructor(CliRepository: Repository<Command>);
    getAllHistory(): Promise<Command[]>;
    postCliCommand(command: string): Promise<Command>;
}
