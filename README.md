# TISN

Software env for an interactive and futuristic table

## Objects definition

#### Pixel object

```json
{
	x : 12,
	y : 25,
	i : 75
}
```

**x** : x position on the lightgrid 
**y** : y position on the lightgrid 
**i** : light intensity of the pixel (range 1-100)

#### Frame 
A frame is a *set* of pixels, such as : 

```json
[
	{x : 12, y : 25, i : 75},
	{x : 9, y : 27, i : 90},
	{x : 21, y : 8, i : 100}
]
```

**Note** : order is unimportant


#### Animation
An animation is a list of frames, plus some properties

```json
{
	name : "my awesome animation",
	delta : 25,
	duration : 150,
	mode : "loop",
	frames : [
				[{x : 12, y : 25, i : 75},{x : 9, y : 27, i : 90}],
				[{x : 13, y : 26, i : 95},{x : 10, y : 26, i : 75}],
				[{x : 14, y : 27, i : 100},{x : 11, y : 25, i : 30}]
			 ]
}
```

**Note** : order of list **frames** is primordial

**duration** : the duration of each frame in milliseconds
**delta** : the pause time between each frame in milliseconds

**mode** : the way the animation should loop. Possible values are : "loop" & "rewind"
For 3 frames : 

  - "loop" mode will do : 1 -> 2 -> 3 -> 1 -> 2 -> 3 ...
  - "rewind" mode will do : 1 -> 2 -> 3 -> 2 -> 1 -> 2 -> 3 ...
