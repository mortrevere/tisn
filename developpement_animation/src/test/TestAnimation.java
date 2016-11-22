/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package test;

import prod.Frame;
import prod.Animation;
import prod.Pixel;
/**
 *
 * @author Jikiwa
 */
public class TestAnimation {
    
    Frame frame;
    Frame frame2;
    Animation anim;

    public TestAnimation() {
        anim = new Animation(100);
        
        frame = new Frame();
        frame.pixels[0][0][0] = new Pixel(1,1,1,0);
        
        frame2 = new Frame();
        frame2.pixels[0][0][0] = new Pixel(2,2,2,0);
        
        testAjoutFrame();
        testSuppressionFrame();
    }
    
    public void testAjoutFrame(){
        if(anim.getTaille() == 0){
            System.out.println("PASSED : Taille = 0 à l'initialisation");
        }else{
            System.out.println("ERREUR : Taille = "+anim.getTaille()+" devrait être 0");
        }
        
        anim.ajouterUneFrame(frame);
        
        if(anim.getTaille() == 1){
            System.out.println("PASSED : Taille = 1 après l'ajout d'une frame");
        }else{
            System.out.println("ERREUR : Taille = "+anim.getTaille()+" devrait être 1");
        }
        
        if(anim.getAnimation()[0].versChaineCinqPremiers().equals("[{1, 1, 1, 0}{0, 0, 0, 100}{0, 0, 0, 100}{0, 0, 0, 100}{0, 0, 0, 100}]")){
            System.out.println("PASSED : La première frame est bien passée. Format :");
            System.out.println(anim.getAnimation()[0].versChaineCinqPremiers()+" ...");
        }else{
            System.out.println("ERREUR : La frame n'est pas la bonne.");
        }
        
        anim.ajouterUneFrame(frame2);
        
        if(anim.getTaille() == 2){
            System.out.println("PASSED : Taille = 2 après l'ajout d'une deuxième frame");
        }else{
            System.out.println("ERREUR : Taille = "+anim.getTaille()+" devrait être 2");
        }
        
        if(anim.getAnimation()[1].versChaineCinqPremiers().equals("[{2, 2, 2, 0}{0, 0, 0, 100}{0, 0, 0, 100}{0, 0, 0, 100}{0, 0, 0, 100}]")){
            System.out.println("PASSED : La deuxième frame est bien passée. Format :");
            System.out.println(anim.getAnimation()[1].versChaineCinqPremiers()+" ...");
        }else{
            System.out.println("ERREUR : La frame n'est pas la bonne.");
        }
        
    }
    
    public void testSuppressionFrame(){
        anim.supprimerUneFrame(0);
        if(anim.getTaille() == 1){
            System.out.println("PASSED : Taille = 1 après la suppression d'une frame");
        }else{
            System.out.println("ERREUR : Taille = "+anim.getTaille()+", devrait être 1");
        }
        
        if(anim.getAnimation()[0].versChaineCinqPremiers().equals("[{2, 2, 2, 0}{0, 0, 0, 100}{0, 0, 0, 100}{0, 0, 0, 100}{0, 0, 0, 100}]")){
            System.out.println("PASSED : La deuxième frame devenue la première. Format :");
            System.out.println(anim.getAnimation()[0].versChaineCinqPremiers()+" ...");
        }else{
            System.out.println("ERREUR : La frame n'est pas la bonne.");
        }
    }
    
    
    
    
    public static void main(String[] args){
        new TestAnimation();
    }
    
}
