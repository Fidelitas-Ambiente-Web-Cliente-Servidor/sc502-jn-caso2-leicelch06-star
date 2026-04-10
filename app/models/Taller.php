<?php
class Taller
{

    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll()
    {
        $result = $this->conn->query("SELECT * FROM talleres ORDER BY nombre");
        $talleres = [];
        while ($row = $result->fetch_assoc()) {
            $talleres[] = $row;
        }
        return $talleres;
    }
    public function getAllDisponibles()
{
    $result = $this->conn->query("SELECT * FROM talleres WHERE cupo_maximo > 0 ORDER BY nombre");
    $talleres = [];
    while ($row = $result->fetch_assoc()) {
        $talleres[] = $row;
    }
    return $talleres;
}
 public function getById($id)
{
    $result = $this->conn->query("SELECT * FROM talleres WHERE id = $id");
    return $result->fetch_assoc();
}
    public function descontarCupo($tallerId)
    {
        $this->conn->query("UPDATE talleres SET cupo_maximo = cupo_maximo - 1 WHERE id = $tallerId AND cupo_maximo > 0");
    }

    public function sumarCupo($tallerId)
    {
        $this->conn->query("UPDATE talleres SET cupo_maximo = cupo_maximo + 1 WHERE id = $tallerId");
    }
}