///////// This is your game configuration information.  This is an object.  
var config = {
    type: Phaser.AUTO,
		width: 600,
		height: 500,
		backgroundColor: '#fffce1',
		parent: 'game-container',
		physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    audio: {
        disableWebAudio: false
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

///////// These are your Global variables 
var cursors; 
var player;
var platform;
var spaceKey;
var WORLD_WIDTH = 600 * 10; // Add world width constant
var WORLD_HEIGHT = 500; // Add world height constant

///////// This is your game object.  We pass in the setup information here. 
var game = new Phaser.Game(config);

//Download images we need for our game.
function preload ()
{		
	this.load.spritesheet('player', 'https://i.imgur.com/Y7dYaEe.png', { frameWidth: 22, frameHeight: 36 });
	this.load.image('platform', 'https://i.imgur.com/gfV2wJF.png');
	this.load.image('button', 'https://i.imgur.com/OmaIsB1.png');
	this.load.spritesheet('balloon1', 'https://i.imgur.com/LTBIV3v.png', { frameWidth: 156, frameHeight: 336 });
	this.load.spritesheet('balloon2', 'https://i.imgur.com/bLwQlT7.png', { frameWidth: 156, frameHeight: 336 });
	this.load.spritesheet('balloon3', 'https://i.imgur.com/dF9rGEG.png', { frameWidth: 156, frameHeight: 336 });
	this.load.spritesheet('explosion', 'https://i.imgur.com/I4ECOgI.png', { frameWidth: 1000, frameHeight: 892 });
	this.load.image('present', 'https://i.imgur.com/ZJ9y5Oh.png');
	this.load.image('happybirthday', 'https://i.imgur.com/YuPmybU.png');
	this.load.image('banner', 'https://i.imgur.com/lDruX9J.png');
	this.load.image('heart', 'https://i.imgur.com/KM0EQkm.png');
	this.load.image('hat', 'https://i.imgur.com/6IFTYeA.png');
	this.load.image('sparkle', 'https://i.imgur.com/y4Gk0H1.png');
	this.load.image('cake', 'https://i.imgur.com/0nHWhR9.png');
	this.load.image('couple1', 'https://i.imgur.com/jkgEDYn.jpeg');
	this.load.image('couple2', 'https://i.imgur.com/dr3esuE.jpeg');
	this.load.image('quote1', 'https://i.imgur.com/5xYvUv1.png');
	this.load.image('quote2', 'https://i.imgur.com/Ofx6Esd.png');
	this.load.image('quote3', 'https://i.imgur.com/zHaWaxf.png');
	this.load.image('quote4', 'https://i.imgur.com/juHi1Bq.png');
	this.load.image('quote5', 'https://i.imgur.com/ViW2SGk.png');
	this.load.image('quote6', 'https://i.imgur.com/6V6vfxD.png');
	this.load.image('quote7', 'https://i.imgur.com/rSWDy4L.png');
	this.load.image('quote8', 'https://i.imgur.com/DXlwOm5.png');
	this.load.image('quote9', 'https://i.imgur.com/xtTLKxW.png');
	this.load.image('quote10', 'https://i.imgur.com/hmAbjFW.png');
	this.load.image('quote11', 'https://i.imgur.com/Abvpl6j.png');
	this.load.image('quote12', 'https://i.imgur.com/BYnSyBN.png');
	this.load.image('quote13', 'https://i.imgur.com/Gxmd3TH.png');
	this.load.image('quote14', 'https://i.imgur.com/POxJBZm.png');
	this.load.image('quote15', 'https://i.imgur.com/VDXY7GU.png');
	this.load.image('quote16', 'https://i.imgur.com/QxkR2wC.png');
	this.load.image('quote17', 'https://i.imgur.com/ROpuu2s.png');
	this.load.image('quote18', 'https://i.imgur.com/ZQof0b9.png');
	this.load.image('quote19', 'https://i.imgur.com/BO6BwWT.png');
	this.load.image('quote20', 'https://i.imgur.com/CKJdWpd.png');
	this.load.image('quote21', 'https://i.imgur.com/U2Rdi4U.png');
	this.load.image('quote22', 'https://i.imgur.com/veKlC0n.png');
	this.load.image('quote23', 'https://i.imgur.com/xdNm4cE.png');
	this.load.image('quote24', 'https://i.imgur.com/5MmmEyF.png');
	this.load.image('quote25', 'https://i.imgur.com/u1qUHta.png');
	this.load.image('quote26', 'https://i.imgur.com/yfzprBi.png');
	// Load quote images
	// for (let i = 1; i <= 26; i++) {
	// 	this.load.image(`quote${i}`, `https://i.imgur.com/quote${i}.png`);
	// }
}

//////// This is your create function 
//////// Add your images here
function create ()
{
	// Create start button
	const startButton = this.add.image(300, 250, 'button')
		.setInteractive()
		.setScale(0.3)
		.on('pointerover', () => {
			startButton.setScale(0.35); // Slightly larger on hover
		})
		.on('pointerout', () => {
			startButton.setScale(0.3); // Back to original size
		})
		.on('pointerdown', () => {
			startButton.destroy();
			startGame(this);
		});
	
	// Hide the game elements initially
	this.gameStarted = false;
}

function startGame(scene) {
	scene.gameStarted = true;
	
	// Create multiple banners to span the entire game width
	const bannerWidth = 600 * 0.376; // Width of one banner after scaling
	const numBanners = Math.ceil(WORLD_WIDTH / bannerWidth);
	
	for (let i = 0; i < numBanners; i++) {
		const banner = scene.add.image(i * bannerWidth, 50, 'banner')
			.setScale(0.3)
			.setOrigin(0, 0.5); // Set origin to left center for proper alignment
	}
	
	// Add couple images at the end of the world
	const couple1 = scene.add.image(WORLD_WIDTH - 500, 300, 'couple1')
		.setScale(0.05)
		.setOrigin(0.5, 0.5);
	
	const couple2 = scene.add.image(WORLD_WIDTH - 100, 300, 'couple2')
		.setScale(0.05)
		.setOrigin(0.5, 0.5);
	
	// Create and animate the "Find the balloons!" text
	const findText = scene.add.text(300, 100, 'Find the balloons! \nLeft and right arrow keys to move and space to jump', {
		fontSize: '15px',
		fontFamily: '"Press Start 2P", monospace',
		fill: '#EE7A3B',
		stroke: '#000000',
		strokeThickness: 4
	}).setOrigin(0.5);
	
	// First tween: slide down
	scene.tweens.add({
		targets: findText,
		y: 150,
		duration: 1000,
		ease: 'Power2',
		onComplete: () => {
			// Second tween: wait 2 seconds then fade out
			scene.tweens.add({
				targets: findText,
				alpha: 0,
				duration: 1000,
				delay: 2000,
				ease: 'Power2',
				onComplete: () => {
					findText.destroy();
				}
			});
		}
	});
	
	// Create birthday celebration elements at the end of the world
	const endX = WORLD_WIDTH - 300; // Position near the end of the world
	
	// Create the banner
	const banner = scene.add.image(endX, 150, 'banner')
		.setScale(0.3)
		.setOrigin(0.5, 0.5);
	
	// Create the happy birthday text
	const happyText = scene.add.image(endX, 90, 'happybirthday')
		.setScale(0.2)
		.setOrigin(0.5, 0.5);
	
	// Create the cake
	const cake = scene.add.image(endX, 350, 'cake')
		.setScale(0.2)
		.setOrigin(0.5, 0.5);
	
	// Create hearts around the cake
	const hearts = [];
	for (let i = 0; i < 3; i++) {
		const heart = scene.add.image(
			endX - 60 + (i * 60),
			i === 1 ? 260 : 270, // Move middle heart up by 10 pixels
			'heart'
		).setScale(0.1);
		hearts.push(heart);
	}
	
	// Create the hat
	const hat = scene.add.image(endX - 120, 220, 'hat')
		.setScale(0.2)
		.setOrigin(0.5, 0.5);
	
	// Create sparkles
	const sparkles = [];
	for (let i = 0; i < 5; i++) {
		const sparkle = scene.add.image(
			endX - 180 + (i * 60),
			50 + (i * 30),
			'sparkle'
		).setScale(0.1);
		sparkles.push(sparkle);
	}
	
	// Add floating animation to all elements
	const elements = [banner, happyText, cake, hat, ...hearts, ...sparkles];
	elements.forEach(element => {
		scene.tweens.add({
			targets: element,
			y: element.y + Phaser.Math.Between(-10, 10),
			duration: 2000,
			yoyo: true,
			repeat: -1,
			ease: 'Sine.easeInOut'
		});
	});
	
	cursors = scene.input.keyboard.createCursorKeys();
	spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	
	// Create animations
	scene.anims.create({
		key: 'left',
		frames: scene.anims.generateFrameNumbers('player', { start: 54, end: 55 }),
		frameRate: 10,
		repeat: -1
	});

	scene.anims.create({
		key: 'turn',
		frames: [ { key: 'player', frame: 0 } ],
		frameRate: 20
	});

	scene.anims.create({
		key: 'right',
		frames: scene.anims.generateFrameNumbers('player', { start: 18, end: 19 }),
		frameRate: 10,
		repeat: -1
	});

	// Create balloon animations
	scene.anims.create({
		key: 'float1',
		frames: scene.anims.generateFrameNumbers('balloon1', { start: 0, end: 3 }),
		frameRate: 8,
		repeat: -1
	});

	scene.anims.create({
		key: 'float2',
		frames: scene.anims.generateFrameNumbers('balloon2', { start: 0, end: 3 }),
		frameRate: 8,
		repeat: -1
	});

	scene.anims.create({
		key: 'float3',
		frames: scene.anims.generateFrameNumbers('balloon3', { start: 0, end: 3 }),
		frameRate: 8,
		repeat: -1
	});

	// Create explosion animation
	scene.anims.create({
		key: 'explode',
		frames: scene.anims.generateFrameNumbers('explosion', { start: 0, end: 3 }),
		frameRate: 10,
		repeat: 0
	});

	player = scene.physics.add.sprite(50, 450, 'player');
	player.setScale(1.5);
	player.setOrigin(0.5, 1);
	
	// Create multiple platforms to cover the world width
	const platformWidth = 100; // Width of each platform
	const numPlatforms = Math.ceil(WORLD_WIDTH / platformWidth);
	const platforms = [];
	
	for (let i = 0; i < numPlatforms; i++) {
		const platform = scene.physics.add.image(i * platformWidth, 500, 'platform');
		platform.setScale(0.5);
		platform.setOrigin(0.5, 0.5);
		platform.setCollideWorldBounds(true);
		platforms.push(platform);
	}
	
	// Create presents at different positions
	const presents = [];
	const presentPositions = [
		{ x: 800, y: 300 },
		{ x: 1200, y: 300 },
		{ x: 1600, y: 300 },
		{ x: 2000, y: 300 },
		{ x: 2400, y: 300 },
		{ x: 2800, y: 300 },
		{ x: 3200, y: 300 },
		{ x: 3600, y: 300 },
		{ x: 4000, y: 300 },
		{ x: 4400, y: 300 }
	];
	
	presentPositions.forEach(pos => {
		const present = scene.physics.add.sprite(pos.x, pos.y, 'present');
		present.setScale(0.2);
		present.setOrigin(0.5, 1); // Set origin to bottom center
		present.setCollideWorldBounds(true);
		present.body.setImmovable(true); // Make presents immovable
		present.body.setSize(200 * 0.2, 200 * 0.2); // Set collision body to match scaled size (original image is 200x200)
		present.body.setSize(372, 298)
		present.body.setOffset(0, 0); // Reset offset
		presents.push(present);
	});
	
	// Create four balloons at different positions
	const balloons = [];
	const balloonTypes = ['balloon1', 'balloon2', 'balloon3'];
	const balloonSpacing = (WORLD_WIDTH - 700) / 26; // Space balloons evenly across remaining width
	
	// Array of quote image keys
	const quoteKeys = Array.from({length: 26}, (_, i) => `quote${i + 1}`);
	
	for (let i = 0; i < 26; i++) {
		const x = 700 + (i * balloonSpacing); // Start at x=700
		const balloonType = balloonTypes[Math.floor(Math.random() * balloonTypes.length)];
		const balloon = scene.physics.add.sprite(x, 300, balloonType);
		balloon.setScale(0.19); // Reduced scale
		balloon.play(`float${balloonType.slice(-1)}`); // Play the corresponding float animation
		balloon.setVelocityX(0); // No horizontal movement
		balloon.setVelocityY(Phaser.Math.Between(-100, 100)); // Increased vertical movement range
		balloon.setCollideWorldBounds(true);
		balloon.setBounce(1); // Perfect bounce
		balloon.setGravityY(-150); // Increased upward gravity
		balloon.body.setSize(156, 336); // Use original sprite size
		balloon.body.setOffset(0, 0); // Reset offset
		balloon.quoteKey = quoteKeys[i]; // Assign quote image key to each balloon
		balloons.push(balloon);
	}
	
	// Add collision between balloons and platforms
	platforms.forEach(platform => {
		balloons.forEach(balloon => {
			scene.physics.add.collider(balloon, platform);
		});
	});
	
	// Add collision between presents and platforms
	platforms.forEach(platform => {
		presents.forEach(present => {
			scene.physics.add.collider(present, platform);
		});
	});
	
	player.setCollideWorldBounds(true);
	
	// Add collisions for all platforms
	platforms.forEach(platform => {
		scene.physics.add.collider(player, platform);
	});
	
	// Add collision between player and presents
	presents.forEach(present => {
		scene.physics.add.collider(player, present, null, null, scene);
	});
	
	// Set up camera to follow player
	scene.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
	scene.cameras.main.startFollow(player, true, 0.1, 0.1);
	scene.cameras.main.setDeadzone(100, 50);
	
	// Set world bounds
	scene.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

	// Add collision between player and balloons
	balloons.forEach(balloon => {
		scene.physics.add.collider(player, balloon, (player, balloon) => {
			// Create explosion at balloon's position
			const explosion = scene.add.sprite(balloon.x, balloon.y, 'explosion')
				.setScale(0.05)
				.play('explode');
			
			// Remove explosion after animation completes
			explosion.once('animationcomplete', () => {
				explosion.destroy();
			});
			
			// Create quote image
			const quote = scene.add.image(balloon.x, -50, balloon.quoteKey)
				.setScale(0.5)
				.setOrigin(0.5);
			
			// First tween: slide down
			scene.tweens.add({
				targets: quote,
				y: 100,
				duration: 500,
				ease: 'Power2',
				onComplete: () => {
					// Second tween: wait 2 seconds then fade out
					scene.tweens.add({
						targets: quote,
						alpha: 0,
						duration: 500,
						delay: 2000,
						ease: 'Power2',
						onComplete: () => {
							quote.destroy();
						}
					});
				}
			});
			
			// Remove the balloon
			balloon.destroy();
		});
	});
}

//////// This is your update function 
// Game Loop. Repeats 60 times per second
function update ()   
{
	if (!this.gameStarted) return;
	
	//This code handles moving Mario if a cursor key is pressed
	if (cursors.left.isDown)      // If the left cursor key is pressed
	{
		player.setVelocityX(-300);  // Move to the left (negative value)
		player.anims.play('left', true);
	}
	else if (cursors.right.isDown) // Or If the right cursor key is pressed.
	{
		player.setVelocityX(300);  // Positive to the right
		player.anims.play('right', true);
	} else {  // Nothing was pressed
		player.setVelocityX(0);
		player.anims.play('turn');
	} 

	// Jump when space is pressed and player is on the ground
	if (Phaser.Input.Keyboard.JustDown(spaceKey) && player.body.touching.down) {
		player.setVelocityY(-200); // Jump up
	}
}