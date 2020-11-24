const app = new Vue({

    el: '#main',
    data: {
        cpu_valor: 100,
        est_cpu: null,
        ram_valor: 100,
        est_ram: null,
        conex_lo: null,
        conex_input: 100,
        conex_output: 100,
        hdd_valor: 100,
        est_hdd: null,
        cpuf_valor: null,
        est_cpuf: null,
        ramf_valor: null,
        est_ramf: null,
        conex_f: 'vmnet9',
        conex_inputf: null,
        conex_outputf: null,
        hddf_valor: null,
        est_hddf: null,
        c_idhost: null,
        c_hostname: null,
        c_ip: null,
        c_falta: null,
        c_cliente: '',
        lista_servidores: [],
        c_idcliente: null,
        c_razsoc: '',
        c_nombre: '',
        c_apellido: '',
        c_correo: '',
        c_telef: '',
        lista_clientes: [],
        c_selec_srv: localStorage.getItem('ip'),
        c_selec_cli: '',
    },

    methods: {

        /* SERVIDORES */

        listarServer() {

            axios.get('http://localhost:5000/equipo').then(resultado => {

                this.lista_servidores = resultado.data;

            });


        },
        obteneridcliente(id_cliente) {

            c_selec_cli = id_cliente;

        },

        obtenerServidor(dir_ip) {

            localStorage.setItem('ip', dir_ip);

            location.reload();

        },

        guardarServer() {


            let unSvr = {
                hostname: this.c_hostname,
                dir_ip: this.c_ip,
                fecha_carga: this.c_falta,
                cliente: this.c_selec_cli,
            }

            axios.post('http://localhost:5000/equipo', unSvr).then(resultado => {

                alert(resultado.data);
                this.listarServer();

            });
            this.c_id_host = null;
            this.c_hostname = null;
            this.c_ip = null;
            this.c_falta = null;
            this.c_selec_cli = '';
        },

        seleccionarServer(id_host, hostname, dir_ip, fecha_carga, cliente) {

            this.c_idhost = id_host;
            this.c_hostname = hostname;
            this.c_ip = dir_ip;
            this.c_falta = fecha_carga;
            this.c_selec_cli = cliente;
        },

        eliminarServer() {

            id_host = this.c_idhost;

            axios.delete('http://localhost:5000/equipo/' + id_host).then(resultado => {
                alert(resultado.data);
                this.listarServer();
                this.c_id_host = null;
                this.c_hostname = null;
                this.c_ip = null;
                this.c_falta = null;
                this.c_selec_cli = '';
            });

        },

        actualizarServer() {

            let id_host = this.c_idhost;

            let unSrv = {

                hostname: this.c_hostname,
                dir_ip: this.c_ip,
                fecha_carga: this.c_falta,
                cliente: this.c_cliente,

            }

            axios.put('http://localhost:5000/equipo/' + id_host, unSrv).then(resultado => {

                alert(resultado.data);
                this.listarServer();
                this.c_hostname = null;
                this.c_ip = null;
                this.c_falta = null;
                this.c_cliente = '';
                this.c_idhost = null;
            })
        },

        /* CLIENTES */

        listarClientes() {

            axios.get('http://localhost:5000/cliente').then(resultado => {

                this.lista_clientes = resultado.data;

            });
        },

        guardarCliente() {

            let unCli = {

                razon_social: this.c_razsoc,
                nombre: this.c_nombre,
                apellido: this.c_apellido,
                telefono: this.c_telef,
                correo_electronico: this.c_correo,
            }

            axios.post('http://localhost:5000/cliente', unCli).then(resultado => {

                alert(resultado.data);
                this.listarClientes();

            });

            this.c_razsoc = '';
            this.c_nombre = '';
            this.c_apellido = '';
            this.c_telef = '';
            this.c_correo = '';
        },

        seleccionarCliente(id_cliente, razon_social, nombre, apellido, telefono, correo_electronico) {

            this.c_idcliente = id_cliente
            this.c_razsoc = razon_social;
            this.c_nombre = nombre;
            this.c_apellido = apellido;
            this.c_telef = telefono;
            this.c_correo = correo_electronico;
        },

        eliminarCliente() {

            id_cliente = this.c_cliente;

            axios.delete('http://localhost:5000/cliente/' + id_cliente).then(resultado => {

                alert(resultado.data);
                this.listarClientes();
                this.c_cliente = null;
            });

        },

        actualizarCliente() {

            let id_cliente = this.c_idcliente;

            let unCli = {

                razon_social: this.c_razsoc,
                nombre: this.c_nombre,
                apellido: this.c_apellido,
                telefono: this.c_telef,
                correo_electronico: this.c_correo,
            }

            axios.put('http://localhost:5000/cliente/' + id_cliente, unCli).then(resultado => {

                alert(resultado.data);
                this.listarClientes();
                this.c_idcliente = null;
                this.c_razsoc = '';
                this.c_nombre = '';
                this.c_apellido = '';
                this.c_telef = '';
                this.c_correo = '';
            });
        },
        /* SOCKET IO */
        capturarCpu() {

            const socket = io('http://' + localStorage.getItem('ip') + ':5000');

            socket.on('cpu', (info) => {

                this.cpu_valor = info;

            });

        },

        capturarRam() {

            this.ram_valor = '';

            const socket = io('http://' + localStorage.getItem('ip') + ':5000');

            socket.on('ram', (data) => {

                this.ram_valor = data;

            });
        },

        capturarConexion() {

            this.conex_input = '';
            this.conex_output = '';

            const socket = io('http://' + localStorage.getItem('ip') + ':5000');

            socket.on('conexionlo', (data) => {

                this.conex_lo = data.interface;
                this.conex_input = data.inputBytes / 1000;
                this.conex_output = data.outputBytes / 1000;
            });

        },

        capturarHdd() {

            this.hdd_valor = '';

            const socket = io('http://' + localStorage.getItem('ip') + ':5000');

            socket.on('hdd', (data) => {

                this.hdd_valor = data;

            });



        },
    },

    mounted() {

        $('.tabs').tabs();
        $('select').formSelect();
        M.updateTextFields(); /* Refresca todos los inputs */
    },

    created: function() {

        this.capturarCpu();
        this.capturarRam();
        this.capturarConexion();
        this.capturarHdd();
        this.listarServer();
        this.listarClientes();
    },
})