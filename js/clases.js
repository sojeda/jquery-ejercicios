class Persona {
    constructor(nombre, billetera) {
        this.nombre = nombre
        this.billetera = billetera
    }

    enriquecer(monto) {
        this.billetera += monto;
    }
}

let salado = new Persona('Salado', 10)
salado.enriquecer(54)


class Banco {
    constructor() {
        this.usuarios = {
            'Sergio': 90,
            'Stefano': 1,
            'Carlos': 20,
            'Gabriel': -20
        }
    }

    consultarSaldo(nombre) {
        return this.usuarios[nombre];
    }

    extraer(nombre, monto) {
        // this.usuarios[nombre] = this.usuarios[nombre] - monto;        
        this.usuarios[nombre] -= monto;
    }

    static numeroDeUsuarios() {
        return 4;
    }

    numeroDeUsuarios() {
        return Object.keys(this.usuarios).length;
    }
}

let banco = new Banco();

class Cajero {
    constructor(banco, saldo) {
        this.banco = banco
        this.saldo = parseInt(saldo)
    }

    validarSaldoCajero(monto) {
        return this.saldo >= monto;
    }

    validarSaldoPersona(nombre, monto) {
        return this.banco.consultarSaldo(nombre) >= monto;
    }

    puedeDarDinero(nombre, monto) {
        return this.validarSaldoPersona(nombre, monto) 
                    && this.validarSaldoCajero(monto)
    }

    descontarSaldoCajero(monto) {
        this.saldo -= monto;
    }

    descontarSaldoPersona(persona, monto) {
        this.banco.usuarios[persona] -= monto;
    }

    entregarDinero(persona, monto) {

        if (this.puedeDarDinero(persona, monto)) {
            this.descontarSaldoPersona(persona, monto)
            this.descontarSaldoCajero(monto)

            return `En el cajero quedan: ${this.saldo} 
                    USD y en el Banco le quedan a la persona
                    ${this.banco.usuarios[persona]}`
        }

        return 'O sos pobre o el cajero no tiene plata, o ambas'
    }
}

let cajero = new Cajero(banco, 100)
let cajero2 = new Cajero(banco, 200)

class Sucursal {
    constructor(cajero) {
        this.cajero = cajero
    }

    extraer(nombre, monto) {
        this.cajero.entregarDinero(nombre, monto)
    }
}

class Empleado extends Persona {
    constructor(nombre, billetera, nomina) {
        super(nombre, billetera)
        this.nomina = nomina
    }
}