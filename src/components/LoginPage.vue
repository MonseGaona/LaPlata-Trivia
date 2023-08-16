<template>
    <div class="login-form">
        <div class="loginPage-contents">
            <!-- Icono y título del formulario -->
            <!-- <div class="loginPage-img">
          <img src="../assets/images/logoBlanco.png" alt="icon" />
        </div> -->
            <h1>Registrate</h1>
        </div>

        <form @submit.prevent="handleSubmit">
            <div class="container-two">
                <div class="icon-container">
                    <img src="../assets/images/iconlp.png" alt="icon" />
                </div>
                <p class="loginPage-p">
                    Ingresá tus datos y podrás reclamar tu premio en una de nuestras
                    sucursales presentando solo tu cédula de identidad.
                </p>

                <div v-if="premioGanado">
                    <p class="text-prize">¡Felicidades! Has ganado: {{ premioGanado }}</p>
                </div>

                <div class="input-container">
                    <label for="nombre">Nombre:</label>
                    <input v-model="nombre" type="text" name="nombre" required />
                </div>

                <div class="input-container">
                    <label for="cedula">Número de cédula:</label>
                    <input v-model="cedula" type="text" name="cedula" required />
                </div>

                <div class="input-container">
                    <label for="telefono">Número de teléfono:</label>
                    <input v-model="telefono" type="text" name="telefono" required />
                </div>

                <button type="submit" class="button-login">Enviar</button>
            </div>

        </form>
        <div v-if="showAlert" class="custom-modal">
            <div class="modal-content">
                <p>Genial! Ahora puedes pasar a la sucursal más cercana a retirar tu premio.</p>
                <button @click="closeAlert">OK</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";


export default {
    name: "LoginPage",
    data() {
        return {
            nombre: "",
            cedula: "",
            telefono: "",
            showAlert: false,
            alertMessage: "",
            premioGanado: this.$route.query.premio,
        };
    },

    methods: {
        handleSubmit() {
            // Validar los campos del formulario
            if (!this.nombre.trim() || !this.cedula.trim() || !this.telefono.trim()) {
                this.showAlertModal('Por favor, completa todos los campos.');
                return;
            }

            // Mostrar mensaje de éxito y redirigir
            this.showAlertModal('¡Genial! Puedes retirar tu premio en la sucursal más cercana.');

            // Realizar solicitud POST al servidor
            axios.post("/api/winners", {
                nombre: this.nombre,
                cedula: this.cedula,
                telefono: this.telefono,
                premio: this.premioGanado,
            })
                .then((response) => {
                    // Éxito al guardar los datos en el servidor
                    this.showAlertModal(response.data.message);
                })
                .catch((error) => {
                    // Error al guardar los datos en el servidor
                    console.error("Error al guardar los datos del ganador:", error);
                    this.showAlertModal("Ha ocurrido un error al registrar el ganador. Inténtalo nuevamente más tarde.");
                });
        },

        showAlertModal(message) {
            this.alertMessage = message;
            this.showAlert = true;
        },

        closeAlert() {
            this.showAlert = false;
            this.alertMessage = '';
            this.$router.push('/thank-you'); // Redirigir a la página de agradecimiento
        },
    },
};
</script>


<style>
.login-form {
    /* background-color: #0D1AA2;  */
    /* color: #fff; */
    max-width: 500px;
    height: auto;
    margin: 20px auto;
    padding: 10px;
    border: 1px solid #d7d5d5;
    border-radius: 8px;
    box-shadow: 1px 1px 16px 10px rgba(0, 0, 0, 0.2);
}

.loginPage-contents {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.loginPage-img {
    width: 100px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
}

.loginPage-img img {
    max-width: 100%;
    width: 100%;
}

.container-two {
    width: auto;
    height: auto;
    margin: 40px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 35px;
    border: #ccc solid;
    box-shadow: 1px 1px 16px 10px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    margin-bottom: 50px;
}

.icon-container {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 50%;
}

.icon-container img {
    margin-top: 15px;
    width: 50px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.loginPage-text {
    width: 48%;
    text-align: center;
}

.loginPage-text h1 {
    font-size: 19px;
    color: #fff;
    margin-bottom: 10px;
    text-align: center;
    margin-top: 0;
}

/* .login-form img {
    width: 90px;
    height: 90px;
} */

.loginPage-p {
    text-align: justify;
    font-size: 15px;
    line-height: 1.8;
    margin: 15px 0 15px 0;
}

form {
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
}

label {
    margin-top: 20px;
    font-weight: bold;
}

input {
    margin-top: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 320px;
    border-color: black;
}

.input-container {
    margin: 17px;
}

.button-login {
    padding: 10px 20px;
    border-radius: 5px;
    border: 2.9px solid #0D1AA2;
    background-color: #0D1AA2;
    color: #fff;
    font-size: 17px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    margin: 15px auto;
}

.button-login:hover {
    background-color: #ecae10;
    color: #ccc;
    border: 2.9px solid #ecae10;
}

.custom-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 300px;
    text-align: center;
}

.modal-content p {
    margin: 0;
}

.modal-content button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #0D1AA2;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.modal-content button:hover {
    background-color: #ecae10;
    color: #ccc;
    border: 2.9px solid #ecae10;
}

.text-prize{
    text-align: center;
    margin: 0px auto;
    font-size: medium;
}

@media (max-width: 768px) {
    .login-form {
        max-width: 90%;
        margin: 40px auto;
        padding: 10px;
    }

    .login-form h1 {
        margin-top: 20px;
        margin-bottom: 30px;
    }

    .container-two {
        width: 100%;
        height: auto;

    }

    .icon-container {
        top: -45px;
    }

    .loginPage-p,
    input {
        font-size: 14px;
        padding: 6px;
    }

    input {
        width: 190px;
    }

    .button-login {
        padding: 8px 16px;
        font-size: 14px;
        width: 120px;
    }
}

@media (min-width: 654px) and (max-width: 768px) {

    /* Media query for devices between 654px and 768px */
    .login-form {
        max-width: 80%;
        margin: 30px auto;
        padding: 8px;
    }

    .container-two {
        margin: 10px;
    }

    .icon-container {
        top: -45px;
    }

    .loginPage-p,
    input {
        font-size: 13px;
        padding: 5px;
    }

    .button-login {
        padding: 6px 14px;
        font-size: 13px;
        width: 110px;
    }
}

@media (max-width: 653px) {
    .login-form {
        max-width: 90%;
        margin: 20px auto;
        padding: 5px;
    }

    .container-two {
        width: 95%;
        height: auto;
        margin: 10px;
    }

    .icon-container {
        top: -45px;
    }

    .loginPage-p,
    input {
        /* font-size: 13px; */
        padding: 4px;
    }

    .button-login {
        padding: 6px 12px;
        font-size: 12px;
        width: 100px;
    }
}
</style>