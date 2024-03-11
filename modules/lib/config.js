// spreadMultiplier 
//     0: "none",
//     0.5: "less then normal",
//     1: "normal",
//     1.5: "more then mormal",
//     2: "many".
// You can choose what ever you want in this diapozone ([0, 2]);

let config = { 
    scene: {
        name: null,
        width: 20,
        heigth: 10,
        hasRooms: true,
        room: {
            minRoomSideLength: 3,
            maxRoomSideLength: 8,
        },
        playgroundMultiplier: 0.35,
    },
    environment: {
        obstacles: {
            wall: {
                collision: true,
            }
        },
        playground: {
            floor: {
                collision: false,
            }
        },
    },    
    items: {
        consumable: {
            sword: {
                attackBuff: 5,
                spreadMultiplier: 0.10,
                collision: false,
            },
        },
        collectable: {
            healthPotion: {
                heal: 30,
                spreadMultiplier: 0.25,
                collision: false,
            },
        },
    },    
    characters: {
        player: {
            defaultMaxHealth: 100,
            defaultDamage: 15,
            defaultArmor: 5,
            collision: true,
        },
        enemies : {
            rouge: {
                defaultMaxHealth: 80,
                defaultDamage: 10,
                defaultArmor: 1,
                spreadMultiplier: 0.5,
                collision: true,
            },
        }
    }
};