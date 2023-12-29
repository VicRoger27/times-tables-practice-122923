input.onButtonPressed(Button.A, function () {
	
})
input.onButtonPressed(Button.B, function () {
	
})
input.onGesture(Gesture.Shake, function () {
    game.gameOver()
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    basic.showString("hi do you want to do times tables? ")
    basic.showString("press a if yes. press b if not.")
})
let RES = 0
let TF = 0
let M2 = 0
let M1 = 0
I2C_LCD1602.LcdInit(0)
basic.forever(function () {
    M1 = randint(1, 12)
    M2 = randint(1, 12)
    TF = randint(0, 1)
    if (TF == 0) {
        RES = M1 * M2
    } else {
        RES = 0
    }
})
