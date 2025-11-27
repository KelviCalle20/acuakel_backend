import { Request, Response } from "express";
import { PedidoService } from "../services/pedido.service";
import { Usuario } from "../../usuarios/entities/user.entity";
import { EstadoPedido } from "../entities/estado_pedido.entity";
import { AppDataSource } from "../../../config/db";


const pedidoService = new PedidoService();

export class PedidoController {

    static async getAll(req: Request, res: Response) {
        try {
            const pedidos = await pedidoService.getAllPedidos();
            res.json(pedidos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener pedidos" });
        }
    }

    static async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const pedido = await pedidoService.getPedidoById(id);
            if (!pedido) return res.status(404).json({ message: "Pedido no encontrado" });
            res.json(pedido);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener pedido" });
        }
    }

    static async create(req: Request, res: Response) {
        const { usuarioId, total, estadoId, detalles } = req.body;
        try {
            const usuarioRepo = AppDataSource.getRepository(Usuario);
            const estadoRepo = AppDataSource.getRepository(EstadoPedido);

            const usuario = await usuarioRepo.findOneBy({ id: usuarioId });
            if (!usuario) return res.status(400).json({ message: "Usuario no encontrado" });

            const estadoPedido: EstadoPedido | undefined = estadoId
                ? await estadoRepo.findOneBy({ id: estadoId }) ?? undefined
                : undefined;

            const pedidoCreado = await pedidoService.createPedido(usuario, total, estadoPedido, detalles || []);
            res.status(201).json(pedidoCreado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al crear pedido" });
        }
    }

    static async updateEstado(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const { estadoId, usuarioId } = req.body;
        try {
            const usuarioRepo = AppDataSource.getRepository(Usuario);
            const estadoRepo = AppDataSource.getRepository(EstadoPedido);


            const usuario = await usuarioRepo.findOneBy({ id: usuarioId });
            const estadoPedido = await estadoRepo.findOneBy({ id: estadoId });

            if (!usuario || !estadoPedido) return res.status(400).json({ message: "Usuario o estado inválido" });

            const pedido = await pedidoService.getPedidoById(id);
            if (!pedido) return res.status(404).json({ message: "Pedido no encontrado" });

            const pedidoActualizado = await pedidoService.updatePedidoEstado(pedido, estadoPedido, usuario);
            res.json(pedidoActualizado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al actualizar pedido" });
        }
    }

    static async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const usuarioId = parseInt(req.params.usuarioId);
        try {
            const usuarioRepo = AppDataSource.getRepository(Usuario);

            const usuario = await usuarioRepo.findOneBy({ id: usuarioId });
            if (!usuario) return res.status(400).json({ message: "Usuario no encontrado" });

            const pedido = await pedidoService.getPedidoById(id);
            if (!pedido) return res.status(404).json({ message: "Pedido no encontrado" });

            const pedidoEliminado = await pedidoService.deletePedido(pedido, usuario);
            res.json({ message: "Pedido eliminado correctamente", pedido: pedidoEliminado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al eliminar pedido" });
        }
    }
}
