public class Voiture {
    /* On utilise private pour rendre les "getters" et "setters" utiles, sinon on peut accéder au élement comme tel : voiture.age
    Ce n'est pas recommandé car les getters / setters peuvent avoir une certaine logique (pas de nombre en dessous de 1, le modèle doit avoir un certain nombre de charactères...)
    */
    private String modele;
    private int age;
    private String marque;

// Un constructeur permet d'initialiser l'objet avec tout ou un certain nombre d'éléments
    public Voiture(String modele, int age, String marque) {
        // le 'this.element' référence la classe
        // On pourrait donc mettre :
        // this.modele = toto;
        // Si dans le constructeur on met 'toto' au lieu de modele
        this.modele = modele;
        this.age = age;
        this.marque = marque;
    }

    // Ici, le constructeur ne prend que 2 paramètres, l'age est initialisé automatiquement
    public Voiture(String modele, String marque) {
        this.modele = modele;
        this.age = 1;
        this.marque = marque;
    }

// Renvoi l'élément de la classe
    public String getModele() {
        return modele;
    }

    public int getAge() {
        return age;
    }

    public String getMarque() {
        return marque;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

// Une fonction très pratique en java est le 'equals' qui vérifie si un objet est égale à une autre instance du même objet (avec des paramètres différents)
// L'utilisation de '@override' permet de redéfinir une fonction déja définit.
// Tout les objets descende du primitif 'Object' qui possède des fonctions 'equals' et 'toString' 
    @Override
    public boolean equals(Object autreVoiture) {
        if (this == autreVoiture) {
            return true;
        }
        if (autreVoiture == null) {
            return false;
        }
        // getClass renvoi la classe
        if (getClass() != autreVoiture.getClass()) {
            return false;
        }
        // On fait du upcast de Object (le type le plus primitif) vers notre type Voiture
        Voiture autre = (Voiture) autreVoiture;
        if (modele == null) {
            if (autre.modele != null)
                return false;
        }
        else if (!modele.equals(autre.modele)) {
            return false;
        }
        if (this.age != autre.age)
            return false;
        if (marque == null) {
            if (autre.marque != null)
                return false;
        }
        else if (!marque.equals(autre.marque)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "La voiture " + getMarque() +
            " à un " + getAge() +
            " ans et est de modèle " + getModele();
    }

    public static void main(String[] args) {
        Voiture v1 = new Voiture("Classe A", "Mercedes");
        Voiture v2 = new Voiture("Capture", "Renault");

    System.out.println(v1.toString());
    System.out.println(v2.toString());
    }
}