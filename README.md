# CertiNet (Demo)
> **Objetivo:** desarrollar un maquetado para CertiNet, plataforma que permite buscar profesionales certificados de una manera sencilla para los empleadores.

Esta aplicación es un Aplicación Web; es decir, utiliza un navejador web para funcionar (ej. Google Chrome, Mozilla Firefox, Safari, etc)

> **Importante:** Los datos que utiliza esta aplicación son meramente ilustrativos, no se guardan en ningún servidor externo, sólo se guardan de manera local en el navejador utilizando LocalStorage.

## Tecnologías
El aplicativo se desarrolló con [Sveltekit](https://svelte.dev/docs/kit/introduction) + [Vite](https://vite.dev/), un Framework Web que compila el código fuente y lo transforma en HTML, CSS y Javascript de manera optimizada.

Así mismo, se desarrolló un motor de búsqueda que busca, con base en la información local, resultados con uso de palabras clave y filtros.
El motor de búsqueda es [FlexSearch](https://github.com/nextapps-de/flexsearch) implementado sólo en el frontend (app en el navejador), de igual manera se puede implementar el mismo en un backend que lo alimente con datos originarios de una base de datos.

# Documentación Para Correr y Desplejar el Aplicativo
Esta documentación mostrará como correr y hacer <<deploy>> al proyecto de manera progresiva, es decir de manera local, <<deploy>> en un servidor, y <<deploy>> en una plataforma de contenedores Docker

## Correr la app localmente
> **Prerequisitos:** contar con una terminal compatible con POSIX (Linux, Mac, Windows CMDer) o Powershell en caso de windows. Contar con [NodeJS](https://nodejs.org/en/download) versión 22 o superior instalado y poder hacer uso del comando npm (incluido al instalar [NodeJS](https://nodejs.org/en/download))

Para correr la app de manera local, se tiene que clonar el repositorio o descomprimir el archivo .zip proporcionado.
Ubicarse dentro del proyecto utilizando `cd` (o `dir` en caso de windows) y correr el comando

``` bash
npm run dev
```

## Compilar la app
> Este paso se refiere a la compilación del proyecto para instalar de manera productiva en un servidor

Como el proyecto es simple, no requiere de mayor configuración para llevarse a producción, sólo correr el comando:
``` bash
npm run build
```
Que generará un directorio .build que se deberá transferir a un servidor (con [NodeJS](https://nodejs.org/en/download) 22+ instalado) mediante ftp o ssh (rsync).
Ya una vez esté en el servidor, hay que correr el comando en el mismo directorio donde se encuentra `.build`
``` bash
node build
```

Esto expondrá el aplicativo en modo productivo por el puerto :3000

### Siguientes pasos
Lo anterior mencionado muestra cómo correr la app en un ambiente productivo mediante el puerto :3000, con un inconveniente: si se cierra la sesión de la terminal, la app se cierra también. Por lo que se recomienda utilizar un manejador de procesos como [PM2](https://pm2.io/), [screen](https://www.gnu.org/software/screen/manual/screen.html) o [tmux](https://github.com/tmux/tmux/wiki), que corre la app en un proceso que persiste si la terminal se cierra; es decir, lo deja en sejundo plano de manera indeterminada

De esta manera el aplicativo estaría expuesto de manera local, es decir, mediante http://localhost:3000 (dentro del servidor)

Para exponerlo a más usuarios, es necesario instalar un servidor proxy, que pueda ser capaz de recibir peticiones externas y dirigirlas al puerto :3000 del aplicativo. Esto es [NginX](https://nginx.org/en/), [Traefik](https://doc.traefik.io/traefik/) o [Caddy](https://caddyserver.com/) con una configuración que permita 'mapear' las peticiones ya sea desde el puerto :80/:443 o dominio.com a :3000

ej. Caddy ([ref](https://mainvps.net/blog/using-caddy-as-a-reverse-proxy/))

Al instalar y verificar que el siguiente comando funcione:
``` bash
caddy version
```

Crear un archivo ubicado en `/etc/caddy/Caddyfile` que sea

```
certinet.net {
  reverse_proxy localhost:3000
}
```

Y Reiniciar el servicio Caddy (en caso de usar Linux como servidor) con el comando:
```bash
sudo systemctl reload caddy
```

Esto hará que Caddy:
+ Enrute las peticiones http/https al puerto 3000
+ Automáticamente configure el SSL via Let's Encrypt
+ Renueva los certificados SSL antes de que expiren 
+ Redirecciona peticiones http a https

> **Importante:** se debe crear un rejistro tipo `A` en un DNS que apunte el dominio certinet.net a la IP del servidor, así como configurar el Firewall del mismo por razones de sejuridad

## [Docker](https://www.docker.com/)

El aplicativo se entreja con un archivo Dockerfile que permite construir el aplicativo dentro de un contenedor estándar [OCI](https://opencontainers.org/).

## [Coolify](https://coolify.io/)
Lo anterior puede ser automatizado si al servidor se le instala la plataforma Coolify, un programa que automatiza el <<deploy>> de proyectos que utilicen Docker y estén en un repositorio.

Dicha plataforma permite configurar el 'routing', configuraciones, variables de entorno, etc, con interfaz gráfica y configuración de SSL automática

> **Importante:** se debe crear un rejistro tipo `Wildcard` o `*.certinet.net` que dirija todos los posibles subdominios a la IP del servidor. Además del rejistro tipo `A` que apunte a certinet.net.
> Si el proveedor de DNS no permite rejistros `Wildcard`, se deben crear rejistros tipo `A` para cada subdominio que la app pueda requerir.

## Estructura del código
El código en sí se encuentra dentro de ./src.
Los archivos estáticos (imágenes, logos y demás medios) se encuentran en ./static
Lo demás en el directorio principal son archivos de configuración y dependencias

Al tratarse de un Framework cuyo [routing](https://www.oyova.com/blog/what-is-a-route-web-dev/) está basado en el sistema de archivos, las vistas residen en el directorio ./src/routes

La lógica del motor de búsqueda, componentes y demás utilidades se encuentran dentro de `./src/lib`

### Rutas/Vistas
Se encuentran en `./src/routes`, y cada subdirectorio representa una ruta cuya vista se encuentra dentro de `+page.svelte` y/o `+layout.svelte` (layout envuelve a page y sus subrutas).
Las vistas (`+page.svelte`) tienen sintaxis basada en HTML, que hace uso de un `script tag` que maneja la lógica dentro de la vista

> **Importante:** Al tratarse de una app meramente 'client side', todas las opciones de servidor están apagadas, descrito en el archivo `./src/routes/+layout.ts`
> ```javascript
> export const ssr = false;
> ```

### Motor de Búsqueda
El motor de búsqueda está en `./src/lib/search-indexes`, dividido por entidad para mejor abstracción. Esta implementación hace uso de [FlexSearch](https://github.com/nextapps-de/flexsearch) mediante clases que permiten la codificación de la información de la entidad a un `string` para que el motor pueda indexarlo

### Filtros
De igual manera los filtros están implementados en `./src/lib/filters.svelte.ts`. Igual se utilizan clases para describir las características del filtro  y métodos para filtrar una serie de ids `string[]` que cumplan con lo establecido al crear dicho filtro.

### Modelos de Entidades
Los modelos de las entidades; es decir, los modelos, están descritos en `./src/lib/entities.ts` con sintaxis de esquemas.

### Datos
Los datos de muestra están descritos en `./src/lib/demo-data.ts`