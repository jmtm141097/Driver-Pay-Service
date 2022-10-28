# Back Driver Pay Service

_Prueba de desarrollo backend implementando una pasarela de pagos_

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

_Tener instalado Docker y copiar el archivo .env que adjuntare al correo en la raiz del proyecto_

### Instalación 🔧

```
docker compose up
```

### Uso 

_URL para solicitar un conductor_

```
http://localhost:3001/api/v1/carreras/solicitar-conductor
```

_Debes enviar un JSON con los valores_
```
{
    "identificacion": "6451648", // IDENTIFICACION CONDUCTOR
    "estado": "TERMINADA", // EL CONDUCTOR PUEDE (CANCELADA - TERMINADA)
    "ubicacionFinal": "2.942058, -75.250694" // DESTINO FINAL DEL USUARIO
}
```

_URL para solicitar finalizar la carrera_

```
http://localhost:3001/api/v1/carreras/finalizar-carrera
```

_Debes enviar un JSON con los valores_

```
{
    "identificacion": 1084869583, // IDENTIFICACION DEL USUARIO
    "ubicacionInicial": "2.937043, -75.296442", // COORDENADAS DEL USUARIO
    "vehiculo": "CARRO" // VEHICUELO QUE PREFIERE QUE RECOJA AL USUARIO (CARRO - MOTO - BICICLETA)
}
```

_URL para verificar el estado de la transaccion_

```
http://localhost:3001/api/v1/carreras/consultar-transaccion/:id
```

_El ':id' debe ser reemplazado por el idTransaccion que fue devuelto al finalizar la carrera_

## Construido con 🛠️

-   [Wompi](https://wompi.co/?gclid=CjwKCAjw2OiaBhBSEiwAh2ZSP4-Rj7e80EZqQUUAStk_hDIiVz-fwvAgBUQOsfdKZ_if_ZmTxnCslxoCavEQAvD_BwE) - Pasarela de pagos
-   [npm](https://wompi.co/?gclid=CjwKCAjw2OiaBhBSEiwAh2ZSP4-Rj7e80EZqQUUAStk_hDIiVz-fwvAgBUQOsfdKZ_if_ZmTxnCslxoCavEQAvD_BwE) - Gestor de dependencias
-   [express](https://expressjs.com/es/) - El framework usado
-   [mongoose](https://mongoosejs.com/) - Base de datos

## Autor ✒️

-   **Juan Manuel Tamayo Monje** - _Desarrollo Backend_ - [jmtm141097](https://github.com/jmtm141097)
