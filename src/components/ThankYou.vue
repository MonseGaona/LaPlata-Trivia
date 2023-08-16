<template>
    <div class="thank-you-page">
        <img src="../assets/images/logoBlanco.png" alt="Thank You" />
        <h1>¡Gracias por participar!</h1>
        <p>Esperamos que hayas disfrutado de la experiencia.</p>
    </div>
</template>

<script>
export default {
    name: "ThankYou",
};
</script>

<style>
.thank-you-page {
    max-width: 600px;
    border-radius: 5%;
    margin: 50px auto;
    text-align: center;
    padding: 50px;
    background-color: #0D1AA2;
    color: #fff;
}

h1 {
    font-size: 28px;
    margin-bottom: 20px;
    margin-top: 20px;
}

p {
    font-size: 18px;
    margin-bottom: 30px;
}

img {
    max-width: 100%;
}
</style>
