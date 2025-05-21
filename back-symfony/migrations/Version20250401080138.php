<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250401080138 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE address (id SERIAL NOT NULL, street VARCHAR(255) NOT NULL, street_extra VARCHAR(255) DEFAULT NULL, postal_code VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE ingredient (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, category VARCHAR(255) NOT NULL, unit VARCHAR(255) NOT NULL, is_allergen BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE recipe (id SERIAL NOT NULL, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, image_url VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE school (id SERIAL NOT NULL, address_id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_F99EDABBF5B7AF75 ON school (address_id)');
        $this->addSql('CREATE TABLE subscription (id SERIAL NOT NULL, tarif_id INT NOT NULL, name VARCHAR(255) NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, is_active BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_A3C664D3357C0A59 ON subscription (tarif_id)');
        $this->addSql('COMMENT ON COLUMN subscription.start_date IS \'(DC2Type:date_immutable)\'');
        $this->addSql('COMMENT ON COLUMN subscription.end_date IS \'(DC2Type:date_immutable)\'');
        $this->addSql('CREATE TABLE tarif (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, amount NUMERIC(5, 2) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE "user" (id SERIAL NOT NULL, subsciption_id INT DEFAULT NULL, school_id INT DEFAULT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, roles JSON NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_8D93D6494BC02993 ON "user" (subsciption_id)');
        $this->addSql('CREATE INDEX IDX_8D93D649C32A47EE ON "user" (school_id)');
        $this->addSql('ALTER TABLE school ADD CONSTRAINT FK_F99EDABBF5B7AF75 FOREIGN KEY (address_id) REFERENCES address (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE subscription ADD CONSTRAINT FK_A3C664D3357C0A59 FOREIGN KEY (tarif_id) REFERENCES tarif (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "user" ADD CONSTRAINT FK_8D93D6494BC02993 FOREIGN KEY (subsciption_id) REFERENCES subscription (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "user" ADD CONSTRAINT FK_8D93D649C32A47EE FOREIGN KEY (school_id) REFERENCES school (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE school DROP CONSTRAINT FK_F99EDABBF5B7AF75');
        $this->addSql('ALTER TABLE subscription DROP CONSTRAINT FK_A3C664D3357C0A59');
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT FK_8D93D6494BC02993');
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT FK_8D93D649C32A47EE');
        $this->addSql('DROP TABLE address');
        $this->addSql('DROP TABLE ingredient');
        $this->addSql('DROP TABLE recipe');
        $this->addSql('DROP TABLE school');
        $this->addSql('DROP TABLE subscription');
        $this->addSql('DROP TABLE tarif');
        $this->addSql('DROP TABLE "user"');
    }
}
