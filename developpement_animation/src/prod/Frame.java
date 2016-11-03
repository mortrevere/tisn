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
public class Frame {

    public Pixel[][][] pixels;
    
    public Frame() {
        pixels = new Pixel[2][][];
        
        //Pixels impairs (première ligne)
        pixels[0] = new Pixel[14][9];
        
        for(int i = 0; i < 14; i++){
            for(int j = 0; j < 9; j++){
                pixels[0][i][j] = new Pixel(0, 0, 0, 100);
            }
        }
        
        //Pixels pairs (deuxième ligne)
        pixels[1] = new Pixel[13][8];
        
        for(int i = 0; i < 13; i++){
            for(int j = 0; j < 8; j++){
                pixels[1][i][j] = new Pixel(0, 0, 0, 100);
            }
        }
     
    }

    public Pixel[][][] getPixels() {
        return pixels;
    }

    public void setPixels(Pixel[][][] pixels) {
        this.pixels = pixels;
    }
    
    public String versChaine(){
        String s = "[";
        
        for(int i = 0; i < 14; i++){
            for(int j = 0; j < 9; j++){
                s += pixels[0][i][j].versChaine();
            }
            s += "\n";
            if(i < 13){
                for(int j = 0; j < 8; j++){
                    s += pixels[1][i][j].versChaine();
                }
                
                s += "\n";
            }
        }
        
        s += "]";
        
        return s;
    }
    
    public String versChaineCinqPremiers(){
        String s = "[";
        
        for(int j = 0; j < 5; j++){
            s += pixels[0][0][j].versChaine();
        }
        
        s += "]";
        
        return s;
    }
}
