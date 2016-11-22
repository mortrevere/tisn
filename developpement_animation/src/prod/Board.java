 package prod;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JPanel;

public class Board extends JPanel{
    
    
	
    //Taille de la matrice de led dans la fen�tre
    int matWidth = 700;
    int matHeight = 450;

    //Position de la matrice de led dans la fen�tre
    int matOffX = 0;
    int matOffY = 50;

    //Taille des carr�s
    int sqWidth;
    int sqHeight;

    //Offset des lignes qui forment les carr�s
    int sqOffX;
    int sqOffY;

    int numLine135;
    int numLine45;

    int mouseX, mouseY;
    
    Animation animationSelectionnee;
    int compteurFrameSelectionnee = 0;
    
    boolean voirFramePrecedente = false;

    public Board() {
        
        numLine135 = 14;
        numLine45 = 12;

        sqWidth = 50;

        sqOffX = sqWidth/2;

        addMouseListener(new MouseAdapter(){
            public void mousePressed(MouseEvent e){
                mouseX = e.getX();
                mouseY = e.getY();
                
                if(e.getY() < 40){
                    if(e.getX() < animationSelectionnee.getTaille()*40){
                        for(int i = 0; i < animationSelectionnee.getTaille()+1; i++){
                            if(e.getX() > (i)*40 && e.getX() < (i+1)*40)
                                compteurFrameSelectionnee = i;
                            repaint();
                        }
                    }
                }                
            }
        });
        
        
        animationSelectionnee = new Animation(10);
    }

    //VOIR JSON ET GSON

    @Override
    public void paintComponent(Graphics g) {
        
        super.paintComponent(g);

        paintMatriceLed(g);
        paintFrames(g);

    }

    private void paintMatriceLed(Graphics g) {
        g.drawRect(matOffX, matOffY, matWidth, matHeight);
        for(int i = -9; i < 24; i++){
            g.drawLine(matOffX + sqWidth*i+sqOffX, matOffY, matOffX + matHeight + sqWidth*i+sqOffX, matOffY+matHeight);
            g.drawLine(matOffX + sqWidth*i+sqOffX, matOffY, matOffX - matHeight + sqWidth*i+sqOffX, matOffY+matHeight);
        }
        
        //g.drawRect(mouseX-5, mouseY-5, 10, 10);
    }

    private void paintFrames(Graphics g) {
        
        g.drawRect(0,0,matWidth, 40);
        for(int i = 0; i < animationSelectionnee.getTaille(); i++){
            g.drawRect(40*i, 0, 40, 40);
        }
        
        if(animationSelectionnee.getTaille() > 0){
            g.drawRect(compteurFrameSelectionnee*40+1, 1, 38, 38);
        }

        if(animationSelectionnee.getTaille() > 1 && voirFramePrecedente){
            g.setColor(Color.lightGray);
            g.fillRect((compteurFrameSelectionnee-1)*40+1, 1, 39, 39);
            g.setColor(Color.black);
        }        
    }

    public Animation getAnimationSelectionnee() {
        return animationSelectionnee;
    }

    public void setAnimationSelectionnee(Animation animationSelectionnee) {
        this.animationSelectionnee = animationSelectionnee;
    }

    public int getCompteurFrameSelectionnee() {
        return compteurFrameSelectionnee;
    }

    public void setCompteurFrameSelectionnee(int compteurFrameSelectionnee) {
        this.compteurFrameSelectionnee = compteurFrameSelectionnee;
    }
	
}
