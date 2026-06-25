import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Politique de Confidentialité – Mahdi Créations",
  description: "Politique de confidentialité et de protection des données personnelles de Mahdi Créations.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-dark text-text-white py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <AnimatedSection className="flex flex-col gap-6">
          <h1 className="font-display font-semibold text-4xl md:text-5xl text-gold-gradient">
            Politique de Confidentialité
          </h1>
          <p className="font-body text-xs text-text-muted">Dernière mise à jour : 3 juin 2026</p>

          <div className="font-body text-sm text-text-muted leading-relaxed flex flex-col gap-6 border-t border-white/5 pt-8">
            <p>
              Chez Mahdi Créations, nous accordons une importance primordiale à la confidentialité de vos données. Cette politique décrit comment nous recueillons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre site web et nos services.
            </p>

            <h2 className="font-display text-xl text-text-white font-medium mt-4">1. Collecte des informations</h2>
            <p>
              Nous recueillons des informations lorsque vous remplissez notre formulaire de contact ou réservez une consultation gratuite. Les informations recueillies incluent votre nom, votre adresse e-mail, votre numéro de téléphone et des détails sur votre projet.
            </p>

            <h2 className="font-display text-xl text-text-white font-medium mt-4">2. Utilisation des informations</h2>
            <p>
              Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>Personnaliser votre expérience et répondre à vos besoins individuels.</li>
              <li>Fournir des propositions de services et des devis personnalisés.</li>
              <li>Améliorer notre site web et le service client.</li>
              <li>Vous contacter par e-mail ou par téléphone dans le cadre de votre projet.</li>
            </ul>

            <h2 className="font-display text-xl text-text-white font-medium mt-4">3. Protection des informations</h2>
            <p>
              Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage de pointe pour protéger les informations sensibles transmises en ligne (HTTPS). Les informations ne sont stockées sur aucun serveur public non sécurisé.
            </p>

            <h2 className="font-display text-xl text-text-white font-medium mt-4">4. Divulgation à des tiers</h2>
            <p>
              Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles identifiables à des tiers. Cela ne comprend pas les tierces parties de confiance qui nous aident à exploiter notre site web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.
            </p>

            <h2 className="font-display text-xl text-text-white font-medium mt-4">5. Vos Droits</h2>
            <p>
              Conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et d'opposition aux informations vous concernant, que vous pouvez exercer en nous contactant par e-mail à : <a href="mailto:mahdicreation.group@gmail.com" className="text-gold hover:underline">mahdicreation.group@gmail.com</a>.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
