<template>
    <div>
        <h1 class="title-wheel">¡Oprime la flecha para comenzar!</h1>
        <!-- <span>Prize number: {{ prizeNumber }}</span> -->
        <div class="wheel-wrapper">
            <div class="wheel-pointer" @click="onClickRotate">
                <!-- Iniciar -->
            </div>
            
            <div class="wheel-bg" :class="{ freeze: freeze }" :style="`transform: rotate(${wheelDeg}deg)`">
                <div class="prize-list">
                    <div class="prize-item-wrapper" v-for="(item, index) in prizeList" :key="index">
                        <div class="prize-item" :style="`transform: rotate(${(360 / prizeList.length) * index}deg)`">
                            <!-- <div class="prize-name">
                                {{ item.name }}
                            </div> -->
                            <div class="prize-icon">
                                <img :src="item.icon" :alt="item.name" style="width: 40px; height: 38px;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showPrizeMessage" class="prize-message-container">
            <div class="prize-message">
                <div class="prize-icon">
                    <img :src="prizeList[resultIndex].icon" :alt="prizeList[resultIndex].name"
                        style="width: 85px; height: 85px;">
                </div>
                <p v-if="prizeList[resultIndex].name === 'Otra oportunidad!'">
                    Gracias por participar.
                    Vuelve a intentarlo.
                </p>
                <p v-else>Felicidades! Ganaste: {{ prizeList[resultIndex].name }} &#x1F497;</p>
                <button v-if="prizeList[resultIndex].name === 'Otra oportunidad!'" @click="redirectToHomePage">
                    Volver a Inicio
                </button>
                <button v-else @click="redirectToLoginPage">Registro</button>
            </div>
        </div>

    </div>
</template>
  
<script>

export default {
    name: "PrizeWheel",
    data() {
        return {
            freeze: false,
            rolling: false,
            wheelDeg: 0,
            prizeNumber: 8,
            prizeWon: null,
            prizeListOrigin: [

                {
                    icon: "https://st2.depositphotos.com/1021974/11520/i/450/depositphotos_115208322-stock-illustration-60-percent-discount-illustration.jpg",
                    name: "60% de Descuento en todos los productos"
                },
                {
                    icon: "https://i0.wp.com/logoroga.com/wp-content/uploads/2013/03/La-Plata-empe%C3%B1os.png?fit=500%2C375&ssl=1",
                    name: "Otra oportunidad!"
                },
                {
                    icon: "https://www.parquewarner.com/content/dam/war/images/blog/50-descuento-Blog.jpeg",
                    name: "50% de Descuento en electrodomésticos"
                },
                {
                    icon: "https://png.pngtree.com/png-clipart/20220628/ourlarge/pngtree-cash-banknotes-money-bag-cartoon-png-image_5339686.png",
                    name: "500.000 gs. en efectivo"
                },
                {
                    icon: "https://i0.wp.com/logoroga.com/wp-content/uploads/2013/03/La-Plata-empe%C3%B1os.png?fit=500%2C375&ssl=1",
                    name: "Otra oportunidad!"
                },
                {
                    icon: "https://mastarjeta.net/assets/img/womanmas500.png",
                    name: "Tarjeta MAS con recarga de cien mil"
                },
                {
                    icon: "https://img.freepik.com/vector-premium/caja-regalo-sorpresa-abierta-confeti-caja-regalo-lazo-cinta-roja_349999-764.jpg",
                    name: "¡Regalo Sorpresa!"
                },
                {
                    icon: "https://i0.wp.com/logoroga.com/wp-content/uploads/2013/03/La-Plata-empe%C3%B1os.png?fit=500%2C375&ssl=1",
                    name: "Otra oportunidad!"
                }

            ],
            resultIndex: null,
            showPrizeMessage: false,
        };
    },
    computed: {
        prizeList() {
            return this.prizeListOrigin.slice(0, this.prizeNumber);
        },
        pointerStyle() {
            // Ajustar tamaño del pointer 
            const size = 60 * (this.wheelSize / 300);
            return {
                width: `${size}px`,
                height: `${size}px`,
                lineHeight: `${size}px`,
                fontSize: `${size * 0.6}px`,
            };
        },
        prizeItemStyle() {
            // Ajustar tamaño del item 
            const size = 150 * (this.wheelSize / 300);
            return {
                width: `${size}px`,
                height: `${size}px`,
                fontSize: `${size * 0.1}px`,
            };
        },
        prizeIconStyle() {
            // Ajustar tamaño del icon 
            const size = this.wheelSize; // Set the size proportional to the wheel (you can adjust the factor as needed)
            return {
                width: `${size}px`,
                height: `${size}px`,
            };
        },
        wheelSize() {

            return 400;
        },
    },
    methods: {
        onClickRotate() {

            if (this.rolling) {
                return;
            }
            const result = Math.floor(Math.random() * this.prizeList.length);
            this.roll(result);

        },
        roll(result) {
            this.rolling = true;
            const { wheelDeg, prizeList } = this;
            this.wheelDeg =
                wheelDeg -
                (wheelDeg % 360) +
                6 * 360 +
                (360 - (360 / prizeList.length) * result);
            setTimeout(() => {
                this.rolling = false;
                this.resultIndex = result;
                this.prizeWon = this.prizeList[result].name; // Almacena el nombre del premio ganado
                this.showPrizeMessage = true;

                // Almacena el premio ganado en una variable local
                this.ganado = this.prizeWon;
            }, 4500);
        },

        redirectToHomePage() {
            this.$router.push("/");
        },

        redirectToLoginPage() {
            this.$router.push({
                name: "login",
                query: {
                    premio: this.prizeWon, // Pasa el premio ganado como consulta
                },
            });
        },

    },

};
</script>
  
<style>
/* html {
      background: #dd7c7d;
  } */

.title-wheel {
    text-align: center;
    font-size: 20px;
}

.wheel-wrapper {
    width: 550px;
    height: 550px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.wheel-pointer {
    position: relative;
    width: 0;
    height: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -10%);
    text-align: center;
    line-height: 80px;
    z-index: 10;
    cursor: pointer;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 50px solid #ccc;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
}

.wheel-pointer::after {
    content: "";
    position: absolute;
    top: -32px;
    /* Posición del triángulo respecto al contenedor */
    left: calc(50% - 25px);
    /* Centrar el triángulo horizontalmente */
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    /* Ancho del triángulo */
    border-right: 25px solid transparent;
    /* Ancho del triángulo */
    border-bottom: 50px solid #ccc;
}

.wheel-bg {
    width: 100%;
    height: 100%;
    border-radius: 1000px;
    overflow: hidden;
    transition: transform 4s ease-in-out;
    background: #ecae10;
    border: solid 10px #ccc;
}

.wheel-bg.freeze {
    transition: none;
    background: red;
}

.prize-list {
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
}

.prize-item-wrapper {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 40%);
    width: 200px;
    height: 200px;
}

.prize-item {
    width: 100%;
    height: 100%;
    transform-origin: bottom;
}

.prize-name {
    padding: 10px 0;
    font-size: 13px;
}

.prize-message-container {
    /* position: fixed;
    top: 54%;
    left: 50%;
    transform: translate(-45%, -59%);
    z-index: 999; */
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

/* Estilos para el mensaje del premio */
.prize-message {
    /* transition: background-color 0.2s ease;
    width: 90%;
    height: 90%;
    text-align: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 300px;
    text-align: center;
}

.prize-message p {
    /* padding: 0px 0 10px 0;
    text-align: center;
    font-size: 16px; */
    margin: 0;
}

.prize-message button {
    /* padding: 10px 20px;
    border-radius: 5px;
    border: 2.9px solid #0D1AA2;
    background-color: transparent;
    color: #0D1AA2;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: 190px; */
    
    padding: 10px 20px;
    border-radius: 5px;
    border: 2.9px solid #0D1AA2;
    background-color: transparent;
    color: #0D1AA2;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: 190px; */
    margin: 18px auto 10px auto;
}

.prize-message button:hover {
    background-color: #ecae10;
    color: #fff;
    border: 2.9px solid #ecae10;
}

.prize-icon {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Add some spacing between name and image */
.prize-name {
    padding: 5px 0;
    font-size: 13px;
}

/* Add a media query for responsiveness */
@media (max-width: 768px) {
    .wheel-wrapper {
        width: 80vw;
        height: 80vw;
    }

    .wheel-pointer {
        width: 12vw;
        height: 12vw;
        font-size: 3vw;
        line-height: 12vw;
        margin-top: -1vw;
    }

    .wheel-pointer::after {
        top: -19px;
        /* Posición del triángulo respecto al contenedor */
    }

    .prize-item-wrapper {
        width: 30vw;
        height: 30vw;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 31%);
    }

    .prize-item {
        font-size: 2.5vw;
        transform-origin: bottom;
    }

    .prize-name {
        font-size: 1.5vw;
        padding: 5% 0;
    }

    .prize-message p {
        padding: 8% 0 10% 0;
        font-size: 4vw;
    }

    .prize-message button {
        padding: 3% 6%;
        font-size: 4vw;
        width: 60%;
        margin-top: 5%;
    }
}

</style>