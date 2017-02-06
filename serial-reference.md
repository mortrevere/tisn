# per module IO
In addition to identification, each module will have to follow those rules to communicate with the main rapsberry

```C
/* Libs 
 #include <exemple.h>
 */

#define DEVICE_ID "MODULE_NAME"

char g_INIT_FLAG = 0, g_BUF_POS = 0;
void run();
char buff[2] = {0};
void setup()
{
  Serial.begin(9600);
  while (!Serial);
  Serial.println("init");
}

void loop()
{
  if(g_INIT_FLAG)
    run();
  else {
    if (Serial.available()) {

      char b = Serial.read();
      buff[g_BUF_POS] = b;    
      g_BUF_POS = (b == 'i');

      if(!strcmp(buff, "id"))
      {
        Serial.println(DEVICE_ID);
        g_INIT_FLAG = 1;
      }
    }
  }


} 

void run()
{

  /* 
   Programme principal : 
   */

}

```


### Identification (included in previous code)

M stands for Master, S stands for Slave

> S---M : init

> M---S : id

> S---M : *MODULE_NAME* //see beginning of previous code

------------------------------

Here is a complete reference to the serial-based protocol for each module. Implementation of the protocol is left to the module-maker (see this article on [how to use serial communication](https://arduinobasics.blogspot.fr/2012/07/arduino-basics-simple-arduino-serial.html)).

*Master* designates the central unit, in this case a raspberry pi embedded into the desk.
*Slave* designates the module itself.

## Lamp

#### Master to slave : 

Position low/high
> pos [0,1]

Power off/on : 
> power [0,1]

Color control : 
> color [0..255] [0..255] [0..255]

Brightness control : 
> brightness [0..255]

#### Slave to master

None

## CapaLED

#### Master to slave : 

Lighting and color control
> [[X,Y,R,G,B,I],....,[X,Y,R,G,B,I]]

> X, Y :

> R, G, B : [0..255]

> I : [0..255]

#### Slave to master

Touch indicator
> X,Y

Note : communications for this module needs to be efficient, hence the striped down protocol

## Microphone / FFT

#### Master to slave : 

Input select
> input [jack/mic]

#### Slave to master

Frequencies indicator
> [[f, i],...,[f, i]]

> f in Hz, [20..20000]

> i [1..100] or [0..1] or [0..255]



