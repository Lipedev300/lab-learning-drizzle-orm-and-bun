import { ClientRepository} from './client.repository';
import type { createClientDto} from './createClientDto';
import type { clientResponseDto} from './clientResponseDto';
import type { clientCreating, clientReturning } from '../../db/schemas';

export class ClientService {
    private repository: ClientRepository;

    constructor() {
        this.repository = new ClientRepository;
    }

    async registerClient(data: createClientDto): Promise<clientResponseDto> {
        const clientExist = this.repository.findByName(data.name);
        const duplicateClient = (await clientExist).some(client => client.name.toLowerCase() === data.name.toLowerCase());

        if (duplicateClient) {
            throw new Error("Um cliente com esse nome já existe, tente se registrar com outro nome");
        }

        const clientSaving: clientCreating = {
            name: data.name,
            phone: data.phone,
            interests: data.interests
        }

        const savedClient = await this.repository.createClient(clientSaving);

        return {
            id: savedClient.id,
            name: savedClient.name,
            phone: savedClient.phone,
            createdAt: savedClient.createdAt.toLocaleDateString("pt-BR"),
            interests: savedClient.interests
        }
    }

    async findById(id: string): Promise<clientResponseDto> {
        const clienteEncontrado = await this.repository.findById(id);

        if (!clienteEncontrado) {
            throw new Error(`Cliente com o id ${id} não encontrado, tente novamente`);
        }
        return {
            ...clienteEncontrado,
            createdAt: clienteEncontrado.createdAt.toLocaleDateString('pt-BR')
        };
    }

    async findByName(name: string): Promise<clientResponseDto[]> {
        const nomePesquisa = name.toLowerCase().trim();

        const foundedClients = await this.repository.findByName(nomePesquisa);

        if (foundedClients.length === 0) {
            throw new Error("Nenhum cliente encontrado com sua pesquisa, tente novamente");
        }

        return foundedClients.map(client => ({
            ...client,
            createdAt: client.createdAt.toLocaleDateString('pt-BR')
        }));
    }

    async updateClient(id: string, newData: Partial<createClientDto>): Promise<clientResponseDto> {
        const foundedClient = await this.findById(id);

        const updatedClient = await this.repository.updateClient(id, newData);

        if (!updatedClient) {
            throw new Error("Erro, cliente existia mas não pôde ser atualizado, tente novamente")
        }
        return {
            ...updatedClient,
            createdAt: updatedClient.createdAt.toLocaleDateString('pt-BR')
        }
    }

    async deleteClient(id: string): Promise<clientResponseDto> {
        const foundedClient = await this.findById(id);

        const deletedClient = await this.repository.deleteClient(id);

        if (!deletedClient) {
            throw new Error("Cliente não pôde ser deletado, tente novamente")
        }

        return {
            ...deletedClient,
            createdAt: deletedClient?.createdAt.toLocaleDateString('pt-BR')
        }
    }
}