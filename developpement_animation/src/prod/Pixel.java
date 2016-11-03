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
public class Pixel {
    
    int R,G,B,TRAN;

    public Pixel(int R, int G, int B, int TRAN) {
        this.R = R;
        this.G = G;
        this.B = B;
        this.TRAN = TRAN;
        
    }
    
    public String versChaine(){
        String s = "{";
        
        s = s + R + ", "+G+", "+B+", "+TRAN+"}";
        
        return s;
    }

    public int getR() {
        return R;
    }

    public void setR(int R) {
        this.R = R;
    }

    public int getG() {
        return G;
    }

    public void setG(int G) {
        this.G = G;
    }

    public int getB() {
        return B;
    }

    public void setB(int B) {
        this.B = B;
    }

    public int getTRAN() {
        return TRAN;
    }

    public void setTRAN(int TRAN) {
        this.TRAN = TRAN;
    }
    
    
    
}
