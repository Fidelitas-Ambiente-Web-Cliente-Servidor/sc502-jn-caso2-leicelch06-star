<?php
class Solicitud
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }
    public function getAllPendientes()
    {
        $result = $this->conn->query("SELECT s.*, t.nombre as taller_nombre, u.username FROM solicitudes s, talleres t, usuarios u  WHERE s.taller_id = t.id  AND s.usuario_id = u.id  AND s.estado = 'pendiente'");
        $solicitudes = [];
        while ($row = $result->fetch_assoc()) {
            $solicitudes[] = $row;
        }
        return $solicitudes;
    }

    public function verificarExistente($usuarioId, $tallerId)
    {
        $result = $this->conn->query("SELECT * FROM solicitudes WHERE usuario_id = $usuarioId  AND taller_id = $tallerId AND estado IN ('pendiente', 'aprobada')");
        return $result->num_rows > 0;
    }

    public function crear($usuarioId, $tallerId)
    {
        $query = "INSERT INTO solicitudes (usuario_id, taller_id, estado) 
                  VALUES ($usuarioId, $tallerId, 'pendiente')";
        
        if ($this->conn->query($query)) {
            return ['success' => true];
        }
        return ['success' => false, 'error' => 'Error al crear la solicitud'];
    }


    public function aprobar($solicitudId)
    {
        $query = "UPDATE solicitudes SET estado = 'aprobada' WHERE id = $solicitudId";
        if ($this->conn->query($query)) {
            return ['success' => true];
        }
        return ['success' => false, 'error' => 'Error al aprobar'];
    }

    public function rechazar($solicitudId)
    {
        $query = "UPDATE solicitudes SET estado = 'rechazada' WHERE id = $solicitudId";
        return $this->conn->query($query);
    }

}