def showTask():
    global M1, M2, TF, RES
    M1 = randint(2, 12)
    M2 = randint(2, 12)
    TF = randint(0, 1)
    if TF < 0.5:
        RES = M1 * M2
    else:
        RES = M1 * M2 + randint(-10, 10)
        if RES == M1 * M2:
            TF = 0
    I2C_LCD1602.show_string("" + str(M1) + " x " + ("" + str(M2)) + " = " + ("" + str(RES)) + "     ",
        0,
        0)

def on_button_pressed_a():
    checkAnswer(True)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_gesture_logo_up():
    music.stop_all_sounds()
input.on_gesture(Gesture.LOGO_UP, on_gesture_logo_up)

def on_gesture_tilt_left():
    I2C_LCD1602.backlight_on()
input.on_gesture(Gesture.TILT_LEFT, on_gesture_tilt_left)

def checkAnswer(answer: bool):
    global correct, counter
    if answer:
        correct = M1 * M2 == RES
    else:
        correct = M1 * M2 != RES
    if correct:
        game.add_score(1)
        counter += 1
        music.play(music.tone_playable(330, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
    else:
        game.add_score(-1)
        counter += -1
        music.play(music.tone_playable(131, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
    I2C_LCD1602.show_number(counter, 14, 1)
    if counter == -1:
        I2C_LCD1602.backlight_off()
        I2C_LCD1602.off()
        music.play(music.string_playable("G F E D C D C D ", 120),
            music.PlaybackMode.UNTIL_DONE)
        game.game_over()
    showTask()

def on_button_pressed_ab():
    global counter
    game.set_score(-1000000)
    counter = -1000000
    I2C_LCD1602.backlight_off()
    I2C_LCD1602.off()
    game.game_over()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    checkAnswer(False)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_gesture_tilt_right():
    I2C_LCD1602.backlight_off()
input.on_gesture(Gesture.TILT_RIGHT, on_gesture_tilt_right)

def on_logo_touched():
    I2C_LCD1602.backlight_off()
    I2C_LCD1602.off()
    game.game_over()
input.on_logo_event(TouchButtonEvent.TOUCHED, on_logo_touched)

counter = 0
correct = False
RES = 0
TF = 0
M2 = 0
M1 = 0
I2C_LCD1602.on()
I2C_LCD1602.backlight_on()
I2C_LCD1602.lcd_init(0)
I2C_LCD1602.show_string("a - correct ", 0, 0)
I2C_LCD1602.show_string("b - incorrect", 0, 1)
basic.pause(5000)
I2C_LCD1602.clear()
backround_calc = 60
showTask()

def on_in_background():
    global backround_calc
    while True:
        backround_calc += -1
        I2C_LCD1602.show_number(backround_calc, 7, 1)
        basic.pause(1000)
        if backround_calc == 0:
            game.game_over()
control.in_background(on_in_background)
