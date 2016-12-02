# TISN

Software env for an interactive and futuristic table

## Objects definition

#### Pixel object

```js
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

```js
[
	{x : 12, y : 25, i : 75},
	{x : 9, y : 27, i : 90},
	{x : 21, y : 8, i : 100}
]
```

**Note** : order is unimportant


#### Animation
An animation is a list of frames, plus some properties

```js
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

# API reference
To store and retrieve animations, the application has to communicate with the Pi embedded in the table. A dedicated REST API exists to do so.

#### API infos :
base url : http://table/api

An error is detected by a response code differing from 200 or the presence of an error field in the response object

## Saving animations

#### New one

PUT /animations
  * _takes_ :
    * animation (Animation object)
  * _returns_ :
    * Array
      * animation (Animation object) <- all available animations

#### Existing one

POST /animations/**id**
  * _takes_ :
    * id (string)
    * animation (Animation object)
  * _returns_ :
    * info _or_ error (string)

## Getting available animations

#### All

GET /animations
  * _returns_ :
    * Array
      * Animation objects <- all available animations

#### One in particular

GET /animations/**id**
  * _takes_ :
    * id (string)
  * _returns_ :
    * Array
      * Animation objects <- all available animations

# User space

Animations can be *favorited* or *saved* by users

## Users

#### Getting registered users

GET /users
 * _returns_ :
    * Array
      * String (nicknames)

#### Adding a user

PUT /users
 * _takes_ :
    * nickname (string)
    * password (string)
  * _returns_ :
    * info _or_ error (string)

## Fav

#### Getting favorite animations

GET /u/**nickname**/animations
  * _takes_ :
    * nickname (string)
  * _returns_ :
    * Array
      * String (animation ids)

#### Fav an animation

POST /u/**nickname**/animations/**id**
  * _takes_ :
    * nickname (string)
    * id (string)
  * _returns_ :
    * info _or_ error (string)

#### Un-fav an animation

DELETE /u/**nickname**/animations/**id**
  * _takes_ :
    * nickname (string)
    * id (string)
  * _returns_ :
    * info _or_ error (string)
