<template>
    <section class="sidebar">
        <ul>
            <li>
                <a href=""><img class="icons" src="../assets/icons/menu-white-36dp.svg" alt="Acceuil">Acceuil</a>
            </li>
            <li>
                <a href=""><img class="icons" src="../assets/icons/library_add-white-36dp.svg" alt="Bibliothéques">Bibliothéques</a>
            </li>
             <li>
                <a href=""><img class="icons" src="../assets/icons/subscriptions-white-36dp.svg" alt="Abonnements">Abonnements</a>
            </li>
             <li>
                <a href=""><img class="icons" src="../assets/icons/settings-white-36dp.svg" alt="Paramètres">Paramètres</a>
            </li>
        </ul>
    </section>
</template>

<style lang="scss">
    .sidebar {
        width: 20%;
        background-color: #C4C4C4;
        height: 100%;

        img {
            vertical-align: middle;
        }

        ul {
            li:last-child {
                background-color: red;
                margin-top: auto;
            }
        }
    }

</style>