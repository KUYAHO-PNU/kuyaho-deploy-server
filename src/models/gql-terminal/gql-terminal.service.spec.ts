import { Test, TestingModule } from "@nestjs/testing";
import { GqlTerminalService } from "./gql-terminal.service";

describe("GqlTerminalService", () => {
  let service: GqlTerminalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GqlTerminalService],
    }).compile();

    service = module.get<GqlTerminalService>(GqlTerminalService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
