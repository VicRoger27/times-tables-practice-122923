function showTask () {
    M1 = randint(2, 12)
    M2 = randint(2, 12)
    TF = randint(0, 1)
    if (TF < 0.5) {
        RES = M1 * M2
    } else {
        RES = M1 * M2 + randint(-10, 10)
        if (RES == M1 * M2) {
            TF = 0
        }
    }
}
input.onButtonPressed(Button.A, function () {
    checkAnswer(true)
})
input.onGesture(Gesture.LogoUp, function () {
    music.stopAllSounds()
})
input.onGesture(Gesture.TiltLeft, function () {
    I2C_LCD1602.BacklightOn()
})
function checkAnswer (answer: boolean) {
    if (answer) {
        correct = M1 * M2 == RES
    } else {
        correct = M1 * M2 != RES
    }
    if (correct) {
        game.addScore(1)
        counter += 1
        music.play(music.tonePlayable(330, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    } else {
        game.addScore(-1)
        counter += -1
        music.play(music.tonePlayable(131, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
    if (counter == -1) {
        I2C_LCD1602.BacklightOff()
        I2C_LCD1602.off()
        music.play(music.stringPlayable("G F E D C D C D ", 120), music.PlaybackMode.UntilDone)
        game.gameOver()
    }
    showTask()
}
input.onButtonPressed(Button.AB, function () {
    game.setScore(-1000000)
    counter = -1000000
    I2C_LCD1602.BacklightOff()
    I2C_LCD1602.off()
    game.gameOver()
})
input.onButtonPressed(Button.B, function () {
    checkAnswer(false)
})
input.onGesture(Gesture.TiltRight, function () {
    I2C_LCD1602.BacklightOff()
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    I2C_LCD1602.BacklightOff()
    I2C_LCD1602.off()
    game.gameOver()
})
let counter = 0
let correct = false
let RES = 0
let TF = 0
let M2 = 0
let M1 = 0
I2C_LCD1602.on()
I2C_LCD1602.BacklightOn()
I2C_LCD1602.LcdInit(0)
I2C_LCD1602.ShowString("a - correct ", 0, 0)
I2C_LCD1602.ShowString("b - incorrect", 0, 1)
basic.pause(5000)
I2C_LCD1602.clear()
let backround_calc = 60
showTask()
control.inBackground(function () {
    while (true) {
        I2C_LCD1602.ShowString("" + M1 + " x " + ("" + M2) + " = " + ("" + RES) + "     ", 0, 0)
        I2C_LCD1602.ShowNumber(counter, 14, 1)
        backround_calc += -1
        I2C_LCD1602.ShowNumber(backround_calc, 7, 1)
        basic.pause(1000)
        if (backround_calc == 0) {
            game.gameOver()
        }
    }
})
