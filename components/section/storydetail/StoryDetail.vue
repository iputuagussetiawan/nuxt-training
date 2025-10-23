<script setup lang="ts"></script>

<template>
    <section class="story-detail">
        <div class="container">
            <div class="story-detail__header">
                <p class="story-detail__date">15 May 2023</p>
                <h1 class="story-detail__title">
                    Guardians of the Galaxy Vol. 3
                </h1>

                <div class="story-detail__author">
                    <div class="story-detail__author-image-container">
                        <img
                            src="https://picsum.photos/80/80?random=1"
                            alt="Juliana Putra"
                            class="story-detail__author-image"
                        />
                    </div>
                    <p class="story-detail__author-name">Juliana Putra</p>
                </div>
            </div>

            <div class="story-detail__body">
                <div class="story-detail__image-container">
                    <img
                        src="https://picsum.photos/800/800?random=1"
                        alt=""
                        class="story-detail__image"
                    />
                </div>

                <div class="story-detail__info-container">
                    At their new headquarters on Knowhere,[a] the Guardians of
                    the Galaxy are attacked by Adam Warlock, a Sovereign warrior
                    created by their high priestess Ayesha.[b] After Adam
                    overpowers them and critically wounds Rocket, he is stabbed
                    by Nebula and forced to flee. The Guardians are unable to
                    tend to Rocket's wounds due to a kill switch, made by the
                    company Orgocorp, embedded in him. They travel to Orgocorp's
                    headquarters to find the override code. As Rocket lies
                    unconscious, he recalls his past. As a baby raccoon, he was
                    experimented on by the High Evolutionary, a scientist who
                    sought to enhance and anthropomorphize animal lifeforms to
                    create a Counter-Earth. Rocket befriended the High
                    Evolutionary's other test subjects: the otter Lylla,
                    the walrus Teefs, and the rabbit Floor. The High
                    Evolutionary was impressed by Rocket's intelligence but
                    furious that it exceeded his own. The High Evolutionary
                    perfected his experiments with Rocket's advice but ordered
                    Rocket's brain to be extracted and his friends incinerated.
                    Rocket freed Lylla, only for the High Evolutionary to kill
                    her. Rocket mauled the High Evolutionary and shot his
                    guards, but Teefs and Floor were killed in the chaos. Alone,
                    Rocket stole a spaceship and fled. In the present, the
                    alternate version of Gamora,[c] who has joined the Ravagers,
                    helps the Guardians infiltrate Orgocorp. They retrieve
                    Rocket's file but discover that the code has been removed.
                    The group speculates that Theel, one of the High
                    Evolutionary's advisors, has it, so they depart for
                    Counter-Earth. They are followed by Ayesha and Adam, who are
                    ordered by their creator, the High Evolutionary, to retrieve
                    Rocket for his brain. Upon arriving, the team is helped by
                    residents in tracing Theel to the High Evolutionary's
                    ship. Drax and Mantis remain with Gamora and Rocket as Peter
                    Quill, Groot, and Nebula travel to the High Evolutionary's
                    ship. Nebula is forced to wait outside by guards as Quill
                    and Groot board. Drax and Mantis pursue Quill's group. The
                    High Evolutionary initiates his destruction and planned
                    recreation of Counter-Earth, which kills all life on the
                    planet, including Ayesha. As his ship enters orbit, Quill
                    and Groot leap off and kill Theel, retrieving the code from
                    him. Gamora arrives with their ship to rescue them, while
                    Nebula, Mantis, and Drax board the High Evolutionary's ship
                    to escape the planet. As Quill's group attempts to access
                    the code, Rocket flatlines and has a near-death experience,
                    where he reunites with Lylla, Teefs, and Floor. Lylla tells
                    him that his time has not yet come as Quill uses the code to
                    disable the kill switch and save Rocket's life. Nebula,
                    Mantis, and Drax come across hundreds of imprisoned humanoid
                    children on the High Evolutionary's ship before being
                    captured. Quill's group sets out to rescue the three, who
                    are placed in a chamber with monstrous Abilisks. Mantis
                    befriends the Abilisks, allowing the group to escape and
                    reunite with Quill's group, together overpowering the High
                    Evolutionary's army. Kraglin and Cosmo arrive on Knowhere,
                    and Cosmo creates a telekinetic tunnel connecting Knowhere
                    to the High Evolutionary's ship to free the captured
                    children. Rocket discovers imprisoned animals on the ship
                    before being attacked by the High Evolutionary, but the rest
                    of the Guardians help subdue him, leaving him to perish on
                    his ship. The Guardians rescue the animals and lead them
                    aboard Knowhere. Quill nearly dies trying to cross over but
                    is saved by Adam, who had a change of heart after being
                    saved by Groot. In the aftermath, Quill leaves the
                    Guardians, bestowing the captaincy to Rocket before leaving
                    for Earth to reunite with his grandfather Jason. Mantis
                    embarks on a journey of self-discovery with the Abilisks,
                    Gamora reunites with the Ravagers, and Nebula and Drax
                    remain on Knowhere to raise the rescued children. In
                    a mid-credits scene, the new Guardians, consisting of
                    Rocket, Groot, Cosmo, Kraglin, Adam, Phyla (one of the
                    rescued children), and Adam's pet Blurp, take on a new
                    mission. In a post-credits scene, Quill eats breakfast with
                    Jason.
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.story-detail {
    padding: 60px 0px;
    position: relative;

    @media only screen and (max-width: 991.98px) {
        padding: 42px 0px;
    }
    @media only screen and (max-width: 767.98px) {
        padding: 32px 0px;
    }
    &__header {
        margin-bottom: 50px;
        text-align: center;
        @media only screen and (max-width: 991.98px) {
            margin-bottom: 42px;
        }
        @media only screen and (max-width: 767.98px) {
            margin-bottom: 32px;
        }
    }

    &__date {
        margin: 50px;
        font-weight: 400;
        font-size: 24px;
        line-height: 1.33;
        color: #4b4b4b;
        @media only screen and (max-width: 1399.98px) {
            margin-bottom: 42px;
            font-size: 22px;
        }

        @media only screen and (max-width: 991.98px) {
            margin-bottom: 32px;
            font-size: 20px;
        }
        @media only screen and (max-width: 767.98px) {
            margin-bottom: 24px;
            font-size: 18px;
        }
    }

    &__title {
        margin-bottom: 50px;
        font-weight: 700;
        font-size: 60px;
        line-height: 1.233;
        color: #222;
        font-family: $font-secondary;

        @media only screen and (max-width: 1399.98px) {
            margin-bottom: 42px;
            font-size: 52px;
        }

        @media only screen and (max-width: 991.98px) {
            margin-bottom: 42px;
            font-size: 48px;
        }
        @media only screen and (max-width: 767.98px) {
            margin-bottom: 32px;
            font-size: 42px;
        }
    }

    &__author {
        display: inline-flex;
        align-items: center;
        gap: 12px;
    }

    &__author-image-container {
        width: 50px;
        height: 50px;
        border-radius: 50px;
    }

    &__author-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50px;
    }

    &__body {
        display: grid;
        grid-template-columns: 547px 1fr;
        gap: 60px;
        align-items: start;

        @media only screen and (max-width: 1399.98px) {
            grid-template-columns: 380px 1fr;
            gap: 40px;
        }
        @media only screen and (max-width: 1199.98px) {
            grid-template-columns: 1fr;
            gap: 30px;
        }
    }

    &__image-container {
        position: sticky;
        top: 100px;
        aspect-ratio: 547/600;
        max-width: 547px;

        @media only screen and (max-width: 1199.98px) {
            position: relative;
            max-width: unset;
            top: unset;
            aspect-ratio: 16/9;
        }
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__info-container {
        font-size: 18px;
        line-height: 1.5;
        color: #222222;
    }
}
</style>
