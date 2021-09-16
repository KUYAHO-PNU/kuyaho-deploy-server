import { Command } from "./entities/command.entity";
import { GqlTerminalService } from "./gql-terminal.service";
export declare class GqlTerminalResolver {
    private readonly gqlTerminalService;
    constructor(gqlTerminalService: GqlTerminalService);
    getAllMovies(): Promise<Command[]>;
    createMovie(cli: string): Promise<Command>;
    getCliCommandOne(command: Command): Promise<AsyncIterator<unknown, any, undefined>>;
}
