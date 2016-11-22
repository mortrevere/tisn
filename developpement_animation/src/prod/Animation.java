/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package prod;

/**
 *
 * @author Jikiwa
 */


public class Animation {
    
    Frame[] animation;
    int taille = 0;
    
    public Animation(int tailleMaximale) {
        animation = new Frame[tailleMaximale];
    }
    
    public void ajouterUneFrame(Frame frame){
        animation[taille] = frame;
        taille++;
    }


    
    public void supprimerUneFrame(int index){
        for(int i = index; i < taille; i++){
            animation[i] = animation[i+1];
        }
        taille--;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //SETTERS
    public void setAnimation(Frame[] animation) {
        this.animation = animation;
    }

    public void setTaille(int taille) {
        this.taille = taille;
    }

    //GETTERS
    public Frame[] getAnimation() {
        return animation;
    }

    public int getTaille() {
        return taille;
    }
}
